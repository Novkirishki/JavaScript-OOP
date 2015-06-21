// Create a function constructor for Person. Each Person must have:
// properties firstname, lastname and age
// firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
// age must always be a number in the range (0, 150), inclusive
// the setter of age can receive a convertible-to-number value
// if any of the above is not met, throw Error
// property fullname
// the getter returns a string in the format 'FIRST_NAME LAST_NAME'
// the setter receives a string is the format 'FIRST_NAME LAST_NAME'
// it must parse it and set firstname and lastname
// method introduce() that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
// all methods and properties must be attached to the prototype of the Person

var Person = (function () {
	function Person(fname, lname, age) {
		this.firstname = fname;
		this.lastname = lname;
		this.age = age;
	}
	Object.defineProperties(Person.prototype, {
		'firstname': {
			get: function() {
				return this._firstname;
			},
			set: function(value) {
				if (!(/^[a-zA-Z]+$/.test(value)) || value.length > 20 || value.length < 3) {
					throw new Error('Invalid name');
				}
				this._firstname = value;
			}
		},
		'lastname': {
			get: function() {
				return this._lastname;
			},
			set: function(value) {
				if (!(/^[a-zA-Z]+$/.test(value)) || value.length > 20 || value.length < 3) {
					throw new Error('Invalid name');
				}
				this._lastname = value;
			}
		},
		'age': {
			get: function() {
				return this._age;
			},
			set: function(value) {
				if (value > 150 || value < 0) {
					throw new Error('Invalid age');
				}
				this._age = value;
			} 
		},
		'fullname': {
			get: function() {
				return this.firstname + ' ' + this.lastname;
			},
			set: function(value) {
				value = value.split(' ');
				this.firstname = value[0];
				this.lastname = value[1];
			}
		}
	});
	Person.prototype.introduce = function () {
		return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
	};
	
	return Person;
} ());