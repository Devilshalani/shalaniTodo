// White Devil @ Devilshalani javascript ES6
const month = document.querySelector('.mouth');
const year = document.querySelector('.year');
const day = document.querySelector('.day');
const todoList = document.getElementById('todoList');
const shalaniAdd = document.getElementById('shalaniAdd');
const refresh = document.getElementById('refresh');
const todoCard = document.querySelector('.todoCard');

let counter = 0;
let container = [];
let currentTime = 0;
let trfVal = refresh.style.transform;
let trfSume;

const shalaniClock = (shalani) => {
	setInterval(() => {
		const dd = new Date();
		let mo = dd.getMonth();
		let yy = dd.getFullYear();
		let da = dd.getDay();
		let date = dd.getDate();
		let hh = dd.getHours();
		let mm = dd.getMinutes();
		let ss = dd.getSeconds();
		let hi = 0;
		let si = 0;
		let mi = 0;
		let apm = '';

		if (hh > 12) {
			hh = hh - 12;
			hi = hh;
			apm = 'pm'
		} else {
			hi = hh;
			apm = 'am'
		}
		if (hh < 10) {
			hi = '0' + hh;
		} else {
			hi = hh;
		}
		if (mm < 10) {
			mi = '0' + mm;
		} else {
			mi = mm;
		}
		if (ss < 10) {
			si = '0' + ss;
		} else {
			si = ss;
		}

		if (hh === 00 && mm === 00 && ss === 00) {
			shalaniClear();
		}

		const months = [
			"January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"  
			]; 
		const week = [        
			"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
			];


			month.textContent = `${months[mo]}, ${date}`;
			year.textContent = `${yy}`;
			day.innerHTML = `${week[da]}, ${hi} : ${mi} : ${si} <span>${apm}</span>`;

			currentTime = `${hi} : ${mi} : ${si} <span>${apm}</span>`;

	},1000);
};

const shalaniContent = (shalani, time) => {
	let content = `<label id="popup">${shalani}</label>
	<div class="popup">${time}</div>
	<i class="fa fa-check" id="checke"></i>
	<i class="fa fa-trash" id="trash"></i>`;
	return content;
}

const shalaniLocalSet = (todo, time) => {
	let todos;

	if (!localStorage.getItem('shalaniTodos')) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('shalaniTodos'));
	}
	todos.push(todo);
	localStorage.setItem('shalaniTodos', JSON.stringify(todos))

	let times;

	if (!localStorage.getItem('shalaniTimes')) {
		times = [];
	} else {
		times = JSON.parse(localStorage.getItem('shalaniTimes'));
	}
	times.push(time);
	localStorage.setItem("shalaniTimes", JSON.stringify(times));
}

const shalaniLocalGet = (todo) => {
	let times;

	if (!localStorage.getItem('shalaniTimes')) {
		times = [];
	} else {
		times = JSON.parse(localStorage.getItem('shalaniTimes'));
	}

	let todos;

	if (!localStorage.getItem('shalaniTodos')) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('shalaniTodos'));
		todos.forEach(todoEl => {
			let newTodo = todoEl;
			let li = document.createElement('li');
			li.classList.add('item');
			li.innerHTML = shalaniContent(newTodo, times[counter]);
			todoList.appendChild(li);
			container.push(li);
			counter++;
		});
	}

	let checked;

	if (!localStorage.getItem('shalaniChecked')) {
		checked = [];
	} else {
		checked = JSON.parse(localStorage.getItem('shalaniChecked'));
		checked.forEach(todoEl => {
			let newTodo = todoEl;
			let li = document.createElement('li');
			li.classList.add('item');
			li.classList.add('checked');
			li.innerHTML = shalaniContent(newTodo, times[counter]);
			todoList.appendChild(li);
			container.push(li);
			counter++;
		});
	}
}

const shalaniCkecked = (shalani) => {
	let todos;

	if (!localStorage.getItem('shalaniTodos')) {
		tados = [];
	} else {
		todos = JSON.parse(localStorage.getItem('shalaniTodos'));
	}

	let checked;

	if (!localStorage.getItem('shalaniChecked')) {
		checked = [];
	} else {
		checked = JSON.parse(localStorage.getItem('shalaniChecked'));
	}

	let parentEl = shalani.target.parentElement;
	let checkTxt = parentEl.children[0].textContent;
	if (shalani.target.id === 'trash') {
		parentEl.classList.add('trash');
		counter--;
		parentEl.addEventListener("animationend", (e) => {
			parentEl.remove();
			if (checked.includes(checkTxt)) {
				checked.splice(checked.indexOf(checkTxt), 1);
				localStorage.setItem('shalaniChecked', JSON.stringify(checked));
			}

			if (todos.includes(checkTxt)) {
				todos.splice(todos.indexOf(checkTxt), 1);
				localStorage.setItem('shalaniTodos', JSON.stringify(todos));
			}
		});
	}

	if (shalani.target.id === 'checke') {
		parentEl.classList.toggle('checked');
		if (checked.includes(checkTxt)) {
			checked.splice(checked.indexOf(checkTxt), 1);
			todos.push(checkTxt);
			localStorage.setItem('shalaniTodos', JSON.stringify(todos));
			localStorage.setItem('shalaniChecked', JSON.stringify(checked));
		} else {
			todos.splice(todos.indexOf(checkTxt), 1);
			checked.push(checkTxt);
			localStorage.setItem('shalaniTodos', JSON.stringify(todos));
			localStorage.setItem('shalaniChecked', JSON.stringify(checked));
		}
	}

	if (counter >= 7) {
		shalaniAdd.value = 'sorry......';
	} else {
		shalaniAdd.value = '';
	}
};

const shalaniPopup = (shalani) => {
	container.forEach(item => {
		item.classList.remove('shalaniPopup');
	});
	let tar = shalani.target.parentElement;
	tar.classList.add('shalaniPopup');
	setTimeout(() => {
		tar.classList.remove('shalaniPopup');
	}, 5000);
}

const shalaniCheckValid = (shalani) => {
	let todos;

	if (!localStorage.getItem('shalaniTodos')) {
		tados = [];
	} else {
		todos = JSON.parse(localStorage.getItem('shalaniTodos'));
	}

	let checked;

	if (!localStorage.getItem('shalaniChecked')) {
		checked = [];
	} else {
		checked = JSON.parse(localStorage.getItem('shalaniChecked'));
	}
	if (todos !== undefined && todos.includes(shalani)) {
		let xc = todos.indexOf(shalani);
		container.forEach(item => {
			item.classList.add('shalaniXc');
			setTimeout(() => {
				item.classList.remove('shalaniXc');
			}, 2000);
		});
		container[xc].classList.remove('shalaniXc');
		return null;
	} else {
		if (todos !== undefined && checked.includes(shalani)) {
			return null;
		}
	}
}

const shalaniAddTodos = (shalani) => {
	let ret = shalaniCheckValid(shalani.target.value);
	if (counter >= 7) {
		shalaniAdd.value = 'sorry......';
		return;
	};
	if (ret === null && shalani.key == 'Enter' && shalaniAdd.value !== '') {
		shalaniAdd.setAttribute('placeholder', 'you alredy have it........');
		shalaniAdd.value = '';
		setTimeout(() => {
			shalaniAdd.setAttribute('placeholder', "add to do's");
		}, 5000);
		return;
	};
	if (shalani.key == 'Enter' && shalaniAdd.value !== '') {
		let newTodo = shalani.target.value;
		counter++;
		let li = document.createElement('li');
		li.classList.add('item');
		li.innerHTML = shalaniContent(newTodo, currentTime);
		todoList.appendChild(li);
		container.push(li);
		shalaniLocalSet(shalani.target.value, currentTime);
		shalaniAdd.value = '';
	}
};

const shalaniClear = (shalani) => {
	let todos;

	if (!localStorage.getItem('shalaniTodos')) {
		tados = [];
	} else {
		todos = JSON.parse(localStorage.getItem('shalaniTodos'));
	}

	let checked;

	if (!localStorage.getItem('shalaniChecked')) {
		checked = [];
	} else {
		checked = JSON.parse(localStorage.getItem('shalaniChecked'));
	}

	localStorage.clear("shalaniTodos");
	localStorage.clear("shalaniChecked");
	container.forEach(item => {
		item.classList.add('trash');
		setTimeout(() => {
			item.remove();
			 counter = 0;
			if (counter >= 7) {
				shalaniAdd.value = 'sorry......';
			} else {
				shalaniAdd.value = '';
			}
		}, 1800);
	});

	 trfSume = trfVal + "rotate(1500deg)";
	 refresh.style.transform = trfSume;
	 trfVal = trfSume;
};

const shalaniTodoCard = () => {
	setTimeout(() => {
		todoCard.classList.add('shalani');
	}, 500);
}

shalaniLocalGet();
shalaniClock();
shalaniAdd.addEventListener("keypress", shalaniAddTodos);
todoList.addEventListener("mousemove", shalaniPopup);
todoList.addEventListener("click", shalaniCkecked);
refresh.addEventListener("click", shalaniClear);
window.addEventListener("load", shalaniTodoCard);