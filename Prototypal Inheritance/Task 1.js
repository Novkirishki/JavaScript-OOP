// Create an object domElement, that has the following properties and methods:
// 
// Use prototypal inheritance, without function constructors
// Method init() that gets the domElement type
// i.e. Object.create(domElement).init('div');
// Property type that is the type of the domElement
// a valid type is any non-empty string that contains only Latin letters and digits
// Property innerHTML of type string
// gets the domElement, parsed as valid HTML:
//   <type attr1="value1" attr2="value2" ... > ... content / children's.innerHTML</type>
// attributes must be sorted in ascending alphabetical order by their name, not in the order they were added
// Property content of type string
// sets the content of the element
// works only if there are no children
// Property attributes
// each attribute has name and value
// a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes -
// Property children
// each child is a domElement or a string
// Property parent
// parent is a domElement
// Method appendChild(domElement / string)
// appends to the end of children list
// Method addAttribute(name, value)
// throw Error if type is not valid
// Method removeAttribute(attribute)
// throw Error if attribute does not exist in the domElement

var domElement = (function() {
	var domElement = {};
	
	Object.defineProperties(domElement, {
		init: {
			value: function (elementType) {
				this.type = elementType;
				this._attributes = [];
				this._children = [];
				return this;
			}
		},
		type: {
			get: function() {
				return this._type;
			},
			set: function(value) {
				if (!(/^[a-zA-Z0-9]+$/.test(value)) || typeof(value) != 'string' || value === '') {
					throw new Error('Invalid type');
				}
				this._type = value;
			}
		},
		innerHTML: {
			get: function() {
				//logic
				if (this.type === 'text') {
					return this.content;
				} else {
					var result = '<' + this.type;
					
					for (var attr in this.attributes) {
						result += (' ' + this.attributes[attr].name + '="' + this.attributes[attr].value + '"');
					}
					result += '>';
					if (this.content !== undefined) {
						result += this.content;
					} else {
						for (var child in this.children) {
							result += this.children[child].innerHTML;
						}
					}
					result += '</' + this.type + '>';
					
					return result;
				}
			}
		},
		content: {
			get: function() {
				return this._content;
			},
			set: function(value) {
				if (this.children.length < 1) {
					this._content = value;
				}
			}
		},
		attributes: {
			get: function() {
				return this._attributes;
			},
			set : function(value) {
				this._attributes = value;
			}
		},
		children: {
			get: function() {
				return this._children;
			}
		},
		parent: {
			get: function() {
				return this._parent;
			},
			set: function(value) {
				this._parent = value;
			}
		},
		appendChild: {
			value: function(child) {
				if (typeof(child) === 'string') {
					var newChild = Object.create(domElement).init('text');
					newChild.content = child;
					this.children.push(newChild);
				} else {
					child.parent = this;
					this.children.push(child);
				}
				return this;
			}
		},
		addAttribute: {
			value: function(name, value) {
				if (!(/^[a-zA-Z0-9-]+$/.test(name)) || typeof(name) != 'string' || name === '') {
					throw new Error('Invalid attribute name');
				}
				var atr = {
					name: name,
					value: value
				};
				var flag = 0;
				for (var index in this.attributes) {
					if (this.attributes[index].name === atr.name) {
						this.attributes[index] = atr;
						flag = 1;
					}
				}
				if (flag == 0) {
					this.attributes.push(atr);	
				}
				this.attributes.sort(function(a,b){
					return a.name.localeCompare(b.name);
				});
				return this;
			}
		},
		removeAttribute: {
			value: function(attributeName) {
				var flag = 0;
				for (var index in this.attributes) {
					if (this.attributes[index].name == attributeName) {
						this.attributes.splice(index,1);
						flag = 1;				
					}
				}
				if (flag === 0) {
					throw new Error('Attributes does not exist');
				}
				return this;
			}
		},
	});
	
	return domElement;
}());