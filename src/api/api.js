const BASE_URL = "http://localhost:3500";
const tipsUrl = `${BASE_URL}/tips`;
const registerUrl = `${BASE_URL}/users/register`;
const categoriesUrl = `${BASE_URL}/categories`;
const checkSessionUrl = `${BASE_URL}/users/checkSession`;
const loginUrl = `${BASE_URL}/users/login`;
const expensesUrl = `${BASE_URL}/expenses`;
const expensesByDateUrl = `${BASE_URL}/expenses/dates`;
const usersUrl = `${BASE_URL}/users`;
const postExpenseUrl = `${BASE_URL}/expenses/newExpense`;
const logOutUrl = `${BASE_URL}/users/login/out`;
const deleteExpenseUrl = `${BASE_URL}/expenses/delete`;

const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
}

export const logOut = async () => {
    const request = await fetch(logOutUrl, {
        method: "POST",
        credentials: "include",
        headers: headers
    });
    const response = await request.json();
    return response;
}

export const getTips = async () => {
    const request = await fetch(tipsUrl, {
        method: "GET",
        credentials: "include",
        headers: headers
    })
    const response = await request.json();
    return response;
}

export const getUsers = async () => {
    const request = await fetch(usersUrl, {
        method: "GET",
        credentials: "include",
        headers: headers
    })
    const response = await request.json();
    return response;
}

export const postRegister = async (form) => {
    const request = await fetch(registerUrl, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(form),
        headers: headers
    });
    const response = await request.json();
    if (!request.ok) {
        throw new Error(response);
    };
    return response;
};

export const postLogin = async (form) => {
    const request = await fetch(loginUrl, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(form),
        headers: headers
    });
    const response = await request.json();
    if (!request.ok) {
        throw new Error(response);
    };
    return response;
}

export const checkSession = async () => {
    const request = await fetch(checkSessionUrl, {
        method: 'GET',
        credentials: 'include',
        headers: headers,
    });
    const response = await request.json();
    return response;
}

export const getCategories = async () => {
    const request = await fetch(categoriesUrl, {
        method: "GET",
        credentials: "include",
        headers: headers
    })
    const response = await request.json();
    return response;
}


export const getDetails = async () => {
    const request = await fetch(expensesUrl, {
        method: "GET",
        credentials: "include",
        headers: headers
    })
    const response = await request.json();
    return response;
}

export const getDetailsByDates = async (dateForm) => {
    const request = await fetch(expensesByDateUrl, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(dateForm)
    })
    const response = await request.json();
    return response;
}

/* const updateExpenses = expenses => {
    setExpenses(expenses);
    const request = await fetch(expensesUrl, {
        method: "GET",
        credentials: "include",
        headers: headers
    })
    const response = await request.json();
    return response;
} */

export const addExpense = async (form) => {
    const request = await fetch(postExpenseUrl, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(form),
        headers: headers
    });
    const response = await request.json();
    console.log(response);
    if (!request.ok) {
        throw new Error(response);
    }
    return response;
};


export const deleteExpense = async (idExpense) => {
    const id = idExpense;
    const request = await fetch(deleteExpenseUrl + "/" + id, {
        method: 'DELETE',
        headers: headers,
        credentials: 'include',
    });
    const response = await request.json();
    if (!request.ok) {
        throw new Error(response);
    }
    return response;
};

export const logout = async () => {
    const request = await fetch(logOutUrl, {
        method: 'POST',
        headers: headers,
        credentials: 'include',
    });
    const response = await request.json();
    return response;
};