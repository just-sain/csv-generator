// code by just.sain :3
// all logic with table
const tbody = document.querySelector('#tbody');
// inputs
const userGroup = document.querySelector('#group');
const userEmail = document.querySelector('#email');
const userFirstName = document.querySelector('#firstName');
const userLastName = document.querySelector('#lastName');
// button
const addUserButton = document.querySelector('#addUser');

const addUser = () => {
	const newUser = document.createElement('tr');

	// user data's
	const userName = userEmail.value.slice(0, userEmail.value.indexOf('@'));
	const userPassword = `${userGroup.value}#${new Date().getFullYear()}`;
	const userArrayData = [userEmail.value, userName, userFirstName.value, userLastName.value, userPassword];

	for (const i in userArrayData) {
		const newUserData = document.createElement('td');
		newUserData.innerHTML = userArrayData[i];

		newUser.appendChild(newUserData);
	}

	// adding new
	tbody.appendChild(newUser);
};

addUserButton.addEventListener('click', addUser);

// export logic
function tableToCSV() {
	// Variable to store the final csv data
	var csv_data = [];

	// Get each row data
	var rows = document.querySelectorAll('#table tr');
	for (var i = 0; i < rows.length; i++) {
		// Get each column data
		var cols = rows[i].querySelectorAll('#table td, #table th');

		// Stores each csv row data
		var csvRow = [];
		for (var j = 0; j < cols.length; j++) {
			// Get the text data of each cell of a row and push it to csvrow
			csvRow.push(cols[j].innerHTML);
		}

		// Combine each column value with ;
		csv_data.push(csvRow.join(';'));
	}

	// Combine each row data with new line character
	csv_data = csv_data.join('\n');

	// Call this function to download csv file
	downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
	// Create CSV file object and feed our csv_data into it
	CSVFile = new Blob([csv_data], {
		type: 'text/csv',
	});

	// Create to temporary link to initiate
	// download process
	var temp_link = document.createElement('a');

	// Download csv file
	temp_link.download = `${userGroup.value}.csv`;
	var url = window.URL.createObjectURL(CSVFile);
	temp_link.href = url;

	// This link should not be displayed
	temp_link.style.display = 'none';
	document.body.appendChild(temp_link);

	// Automatically click the link to
	// trigger download
	temp_link.click();
	document.body.removeChild(temp_link);
}

// Getting element by id and adding
// eventlistener to listen every time button get pressed
const btn = document.getElementById('export');
btn.addEventListener('click', tableToCSV);
