//Arrays of Incomes and egresses
const incomes = [];

const egresses = [];

//Function of load 
let loadApp = () => {
    loadHeader();
    incomesUpload();
    egressesUpload();
}

//Function of total incomes
let incomeTotal = () => {
    let total = 0;
    for (let income of incomes) {
        total += income.value;
    }
    return total;
}

//Function of total egress
let egressTotal = () => {
    let total = 0;
    for (let egress of egresses) {
        total += egress.value;
    }
    return total;
}

//Function for load data in header
let loadHeader = () => {
    let budget = incomeTotal() - egressTotal();
    let egressPercentage = egressTotal() / incomeTotal();
    document.getElementById('budget').innerHTML = formatMoney(budget);
    document.getElementById('percentage').innerHTML = formatPercentage(egressPercentage);
    document.getElementById('income').innerHTML = formatMoney(incomeTotal());
    document.getElementById('egress').innerHTML = formatMoney(egressTotal());
    console.log(incomeTotal(), egressTotal());
}

//Format of money
const formatMoney = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
}

//Format of pecentage
const formatPercentage = (value) => {
    return value.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 });
}

//Load income to income list
const incomesUpload = () => {
    let incomesHTML = '';
    for (let income of incomes) {
        incomesHTML += createIncomeHTML(income);
    }
    document.getElementById('income-list').innerHTML = incomesHTML;
}

//Create HTML for a income
const createIncomeHTML = (income) => {
    let incomesHTML = `
    <div class="element cleanStyles">
        <div class="element_description">
            ${income.description}
        </div>
        <div class="right cleanStyles">
            <div class="element_value">+ ${formatMoney(income.value)}</div>
            <div class="element_delete">
                <button class="element_delete--btn">
                    <ion-icon name="close-circle-outline" onclick='deleteIncome(${income.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return incomesHTML;
}

//Function for delete a income
const deleteIncome = (id) => {
    let deleteIndex = incomes.findIndex(income => income.id === id);
    incomes.splice(deleteIndex, 1);
    loadHeader();
    incomesUpload();
}

//Load egress to egress list
const egressesUpload = () => {
    let egressesHTML = '';
    for (let egress of egresses) {
        egressesHTML += createEgressHTML(egress);
    }
    document.getElementById('egress-list').innerHTML = egressesHTML;
}

//Create HTML for a egress
const createEgressHTML = (egress) => {
    let egressHTML = `
    <div class="element cleanStyles">
        <div class="element_description">${egress.description}</div>
        <div class="right cleanStyles">
            <div class="element_value">- ${formatMoney(egress.value)}</div>
            <div class="element_percentage">${formatPercentage(egress.value / incomeTotal())}</div>
            <div class="element_delete">
                    <button class="element_delete--btn" onclick='deleteEgress(${egress.id})'>
                                <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
            </div>
        </div>

     </div>
    `;
    return egressHTML;
}

//Function for delete a egress
const deleteEgress = (id) => {
    let deleteIndex = egresses.findIndex(egress => egress.id === id);
    egresses.splice(deleteIndex, 1);
    loadHeader();
    egressesUpload();
}

//Cleaning the form
const resetForm = () => {
    document.getElementById('form').reset();
}

//Create a income or egress
const addData = () => {
    let form = document.forms['form'];
    let type = form['type'];
    let description = form['description'];
    let value = form['value'];

    if (description.value !== '' && value.value !== '') {
        if (type.value === 'income') {
            incomes.push(new Income(description.value, +value.value));
            loadHeader();
            incomesUpload();
            resetForm();
        } else if (type.value === 'egress') {
            egresses.push(new Egress(description.value, +value.value));
            loadHeader();
            egressesUpload();
            resetForm();
        }
    }
}