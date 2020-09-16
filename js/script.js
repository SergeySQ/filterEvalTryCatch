/* Объявлена функция которая принимает два аргумента "type и value который преобразован в массив",потом фильтруем values спомощью метода filter 
в filter задан аргумент "value" в этот аргумент у нас заносится какой то элемент  и этот аргумент(элемент) "value" мы сравниваем с "type"  */
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
	/* Функцти которая скрывает БЛОК с результатом фильтрации (успешно, неуспешно) */
	hideAllResponseBlocks = () => {
		//responseBlocksArray получает массив со всеми div класса dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//Перебераем массив responseBlocksArray и элеменет который попал в ключ 'block' присваивается стиль display: none
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	/* показывает блок результата в зависимости от вызова функции(showError,showResults,showNoResults) */
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks(); //вызов функции 
		document.querySelector(blockSelector).style.display = 'block'; //тот элемент который был передан в blockSelector будет показан
		if (spanSelector) { //условие на то, что передан ли spanSelector и меняет его на переданный текст в msgText  
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	//функция которая показывает блок результаты 'Что-то пошло не так'
	/* Принимает параметр msgText переданый alertMsg и вызывает функцию  showResponseBlock в которую передает '.dialog__response-block_error', msgText, '#error'*/
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	//функция которая показывает блок результаты 'Вот что получилось'
	/* Принимает параметр msgText переданый alertMsg и вызывает функцию  showResponseBlock в которую передает '.dialog__response-block_ok', msgText, '#ok'*/
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//функция которая показывает блок результаты 'Пока что нечего показать.'
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	tryFilterByType = (type, values) => { //принимает два параметра
		//функция для отлова ошибок: try {...} catch(){...}
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //если полученные данные верны записывает их в строку, через ', '
			//тернарный оператор, проверяет пустой ли valuesArray или нет
			const alertMsg = (valuesArray.length) ? //Проверяет длину valuesArray если > 0 ,то
				`Данные с типом ${type}: ${valuesArray}` : //в переменную alertMsg записывается: `Данные с типом ${type}: ${valuesArray}` 
				`Отсутствуют данные типа ${type}`; //если valuesArray = 0, то в переменную alertMsg записывается:`Отсутствуют данные типа ${type}`
			showResults(alertMsg); //вызывает функцию  showResults и передает переменную как параметр 
		} catch (e) { //если всплывает ошибка в tryFilterByType, выполняется код ниже 
			showError(`Ошибка: ${e}`); //вызывает функцию showResults и передает `Ошибка: ${e}` как переменную , где e - информация об ошибке 
		}
	};

const filterButton = document.querySelector('#filter-btn'); //получение кнопки со страницы 
//навешали событие клика на кнопку 
filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type'); //получение select тип данных
	const dataInput = document.querySelector('#data'); //получение input данные
	//условие,если dataInput пустой, показывать блок : Пока что нечего показать.

	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //при клике на кнопку всплывает подсказка:'Поле не должно быть пустым!'
		showNoResults(); //показывает блок результаты:Пока что нечего показать.
	} else { //в остальных случаях 
		dataInput.setCustomValidity(''); //при клике на кнопку ничего не всплывает(пустая строка)
		e.preventDefault(); //отменяет перезагрузку страници при клике на кнопку
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вызывает функцию и передает два параметра : typeInput  и dataInput ,так же убирает пробелы в этих переданных параметрах 
	}
});