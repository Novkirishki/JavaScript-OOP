// Create a module for a Telerik Academy course
// The course has a title and presentations
// Each presentation also has a title
// There is a homework for each presentation
// There is a set of students listed for the course
// Each student has firstname, lastname and an ID
// IDs must be unique integer numbers which are at least 1
// Each student can submit a homework for each presentation in the course
// Create method init()
// Accepts a string - course title
// Accepts an array of strings - presentation titles
// Throws if there is an invalid title
// Titles do not start or end with spaces
// Titles do not have consecutive spaces
// Titles have at least one character
// Throws if there are no presentations
// Create method addStudent() which lists a student for the course
// Accepts a string in the format 'Firstname Lastname'
// Throws if any of the names are not valid
// Names start with an upper case letter
// All other symbols in the name (if any) are lowercase letters
// Generates a unique student ID and returns it
// Create method getAllStudents() that returns an array of students in the format:
// {firstname: 'string', lastname: 'string', id: StudentID}
// Create method submitHomework()
// Accepts studentID and homeworkID
// homeworkID 1 is for the first presentation
// homeworkID 2 is for the second one
// ...
// Throws if any of the IDs are invalid
// Create method pushExamResults()
// Accepts an array of items in the format {StudentID: ..., Score: ...}
// StudentIDs which are not listed get 0 points
// Throw if there is an invalid StudentID
// Throw if same StudentID is given more than once ( he tried to cheat (: )
// Throw if Score is not a number
// Create method getTopStudents() which returns an array of the top 10 performing students
// Array must be sorted from best to worst
// If there are less than 10, return them all
// The final score that is used to calculate the top performing students is done as follows:
// 75% of the exam result
// 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course

var Course = (function(){
	var studentID = 0;
	var students = [];
	var coursePresentations = [];
	
	var Course = {
		init: function(title, presentations) {
			this.title = title;
			
			//check if there are no presentations
			if (presentations.length <= 0) {
				throw new Error('There are no presentations in this course');
			}
			
			for (var index in presentations) {
				validateTitle(presentations[index]);
			}
			
			coursePresentations = presentations;
			return this;
		},
		addStudent: function(name) {
			var names = name.split(' ');
			
			//throws if student has more than 2 names
			if (names.length > 2) {
				throw new Error('Student has more than 2 names');
			}
			
			validateName(names[0]);
			validateName(names[1]);
			var student = {
				firstname: names[0],
				lastname: names[1],
				id: ++studentID
			};
			
			students.push(student);
			return studentID;
		},
		getAllStudents: function() {
			return students.slice();
		},
		submitHomework: function(studentID, homeworkID) {
			var flag  = 0;
			if (homeworkID < 1 || homeworkID > coursePresentations.length) {
				throw new Error('Invalid homeworkID');
			}
			for (var index in students) {
				if (studentID === students[index].id) {
					students[index][homeworkID] = true;
					flag = 1;
				}
			}
			if (flag === 0) {
				throw new Error('Invalid studentID');
			}
		},
		pushExamResults: function(results) {
			var isStudentIDValid = false;
			
			//throw if results is empty or not array
			if (!Array.isArray(results) || results.length <= 0) {
				throw new Error('No results to push');
			}
			
			for (var index in results) {
				isStudentIDValid = false;
				
				if (isNaN(results[index].score)) {
					throw new Error('Score is not a number');
				}
				
				for (var i in students) {
					if (students[i].id === results[index].StudentID) {
						isStudentIDValid = true;
						if (students[i].Score !== undefined) {
							throw new Error('Student has score already');
						} else {
							students[i].Score = results[index].score;
						}
					}
				}
				
				if (!isStudentIDValid) {
					throw new Error('Student ID is not valid');
				}
			}
			
			for (var index in students) {
				if (students[index].Score === undefined) {
					students[index].Score = 0;
				}
			}
		},
		getTopStudents: function() {
			students.forEach(calculateFinalScore()).sort(function(a,b) {
				return b.FinalScore - a.FinalScore; //sortDescending
			});
			
			return students.slice(0, 10);
		}
	};
	
	Object.defineProperties(Course, {
		title: {
			get: function() {
				return this._title;
			},
			set: function(value) {
				validateTitle(value);
				this._title = value;
			}
		}
	});
	
	function validateTitle(title) {
		if (typeof(title) !== 'string' 
				|| title.length < 1 
				|| (title[0] == ' ')
				|| (title[title.length - 1] == ' ')
				|| (/\s\s/.test(title))
				) {
			throw new Error('Invalid title ' + title);
		}
	}
	
	function validateName(name) {
		if (!(/^[A-Z][a-z]*$/.test(name))) {
			throw new Error('Invalid name');
		}
	}
	
	function calculateFinalScore(student) {
		var coursesCount = coursePresentations.length;
		var homeworksCount = 0;
		
		for (var index = 0; index < coursesCount; index+=1) {
			if (student[index] == true) {
				homeworksCount += 1;
			}			
		}
		
		var finalScore = student.Score * 0.75 + (homeworksCount/coursesCount) * 0.25;
		student.FinlaScore = finalScore;
	}
	
	return Course;
}());

// var jsoop = Object.create(Course).init('MMT', ['abc']);
// //console.log(jsoop.addStudent('Ivan Petrov'));
// console.log(jsoop.getAllStudents());



// ----------------------------			
var validTitles = [
	'Modules and Patterns',
	'Ofcourse, this is a valid title!',
	'No errors hIr.',
	'Moar taitles',
	'Businessmen arrested for harassment of rockers',
	'Miners handed cabbages to the delight of children',
	'Dealer stole Moskvitch',
	'Shepherds huddle',
	'Retired Officers rally',
	'Moulds detonate tunnel',
	'sailors furious',
], validNames = [
	'Pesho',
	'Notaname',
	'Johny',
	'Marulq',
	'Keremidena',
	'Samomidena',
	'Medlar',
	'Yglomer',
	'Elegant',
	'Analogical',
	'Bolsheviks',
	'Reddish',
	'Arbitrage',
	'Toyed',
	'Willfully',
	'Transcribing',
];

function getValidTitle() {
	return validTitles[(Math.random() * validTitles.length) | 0];
}
function getValidName() {
	return validNames[(Math.random() * validNames.length) | 0];
}

function checkStudentList(list1, list2) {
	if(list1.length !== list2.length)
		return false;

	function compare(a, b) {
		return a.id - b.id;
	}

	list1.sort(compare);
	list2.sort(compare);

	for(var i in list1) {
		if(list1[i].id !== list2[i].id)
			return false;
		if(list1[i].firstname !== list2[i].firstname)
			return false;
		if(list1[i].lastname !== list2[i].lastname)
			return false;
	}
	return true;
}

var jsoop = Object.create(Course)
				.init(getValidTitle(), [getValidTitle()]);

			var student = {
				firstname: getValidName(),
				lastname: getValidName(),
			};
			student.id = jsoop.addStudent(student.firstname + ' ' + student.lastname);
			console.log(student);
			console.log(jsoop.getAllStudents());	
			console.log(checkStudentList([student], jsoop.getAllStudents()));