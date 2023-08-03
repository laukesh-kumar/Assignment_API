// script.js
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://qa2.sunbasedata.com/sunbase/portal/api";

  // Helper function to send API requests with mock data
  const sendApiRequest = async (method, url, headers, body) => {
    try {
      // In a real-world scenario, you would use libraries like fetch or jQuery's ajax to perform actual API calls.
      // For demonstration purposes, we'll use mock data and return responses based on the request URLs.
      if (url === `${apiUrl}/assignment_auth.jsp`) {
        // Mock login API response
        return {
          token: "mockBearerToken",
        };
      } else if (url.startsWith(`${apiUrl}/assignment.jsp?cmd=get_customer_list`)) {
        // Mock customer list API response
        return [{
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          phone: "1234567890",
        }, {
          first_name: "Jane",
          last_name: "Smith",
          email: "jane@example.com",
          phone: "9876543210",
        }];
      } else if (url.startsWith(`${apiUrl}/assignment.jsp?cmd=delete`)) {
        // Mock delete customer API response
        return {
          status: 200,
        };
      } else if (url.startsWith(`${apiUrl}/assignment.jsp?cmd=create`)) {
        // Mock create customer API response
        return {
          status: 201,
        };
      } else if (url.startsWith(`${apiUrl}/assignment.jsp?cmd=update`)) {
        // Mock update customer API response
        return {
          status: 200,
        };
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle login form submission
  document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const loginId = document.getElementById("login_id").value;
    const password = document.getElementById("password").value;
    const loginUrl = `${apiUrl}/assignment_auth.jsp`;

    const response = await sendApiRequest("POST", loginUrl, {
      "Content-Type": "application/json",
    }, JSON.stringify({ login_id: loginId, password: password }));

    if (response && response.token) {
      localStorage.setItem("bearerToken", response.token);
      window.location.href = "customer_list.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });

  // Handle customer list retrieval
  const getCustomerList = async () => {
    const token = localStorage.getItem("bearerToken");
    const customerListUrl = `${apiUrl}/assignment.jsp?cmd=get_customer_list`;

    const response = await sendApiRequest("GET", customerListUrl, {
      Authorization: `Bearer ${token}`,
    });

    if (response && Array.isArray(response)) {
      const tbody = document.querySelector("#customerTable tbody");
      tbody.innerHTML = "";

      response.forEach((customer) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${customer.first_name}</td>
          <td>${customer.last_name}</td>
          <td>${customer.email}</td>
          <td>${customer.phone}</td>
          <td><button class="deleteButton" data-uuid="${customer.uuid}">Delete</button></td>
        `;

        tbody.appendChild(row);
      });

      // Add event listener to delete buttons
      const deleteButtons = document.querySelectorAll(".deleteButton");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", deleteCustomer);
      });
    }
  };

  // Handle customer deletion
  const deleteCustomer = async (event) => {
    const token = localStorage.getItem("bearerToken");
    const uuid = event.target.dataset.uuid;
    const deleteUrl = `${apiUrl}/assignment.jsp?cmd=delete&uuid=${uuid}`;

    const response = await sendApiRequest("POST", deleteUrl, {
      Authorization: `Bearer ${token}`,
    });

    if (response && response.status === 200) {
      getCustomerList();
    } else {
      alert("Failed to delete the customer.");
    }
  };

  // Show customer list on customer_list.html
  if (window.location.pathname === "/customer_list.html") {
    getCustomerList();
  }

  // Handle "Add New Customer" button click
  const addCustomerButton = document.getElementById("addCustomerButton");
  if (addCustomerButton) {
    addCustomerButton.addEventListener("click", () => {
      window.location.href = "add_customer.html";
    });
  }

  // Handle add customer form submission
  const addCustomerForm = document.getElementById("addCustomerForm");
  if (addCustomerForm) {
    addCustomerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const token = localStorage.getItem("bearerToken");
      const createCustomerUrl = `${apiUrl}/assignment.jsp?cmd=create`;

      const requestBody = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        street: document.getElementById("street").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
      };

      const response = await sendApiRequest("POST", createCustomerUrl, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, JSON.stringify(requestBody));

      if (response && response.status === 201) {
        window.location.href = "customer_list.html";
      } else {
        alert("Failed to create the customer.");
      }
    });
  }
});
// script.js
document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://qa2.sunbasedata.com/sunbase/portal/api";

  // Helper function to send API requests with mock data
  const sendApiRequest = async (method, url, headers, body) => {
    try {
      // In a real-world scenario, you would use libraries like fetch or jQuery's ajax to perform actual API calls.
      // For demonstration purposes, we'll use mock data and return responses based on the request URLs.
      if (url === `${apiUrl}/assignment_auth.jsp`) {
        // Mock login API response
        return {
          token: "mockBearerToken",
        };
      } else if (url.startsWith(`${apiUrl}/assignment.jsp?cmd=get_customer_list`)) {
        // Mock customer list API response
        return [{
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          phone: "1234567890",
        }, {
          first_name: "Jane",
          last_name: "Smith",
          email: "jane@example.com",
          phone: "9876543210",
        }];
      } else if (url.startsWith(`${apiUrl}/assignment.jsp?cmd=delete`)) {
        // Mock delete customer API response
        return {
          status: 200,
        };
      } else if (url.startsWith(`${apiUrl}/assignment.jsp?cmd=create`)) {
        // Mock create customer API response
        return {
          status: 201,
        };
      } else if (url.startsWith(`${apiUrl}/assignment.jsp?cmd=update`)) {
        // Mock update customer API response
        return {
          status: 200,
        };
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle login form submission
  document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const loginId = document.getElementById("login_id").value;
    const password = document.getElementById("password").value;
    const loginUrl = `${apiUrl}/assignment_auth.jsp`;

    const response = await sendApiRequest("POST", loginUrl, {
      "Content-Type": "application/json",
    }, JSON.stringify({ login_id: loginId, password: password }));

    if (response && response.token) {
      localStorage.setItem("bearerToken", response.token);
      window.location.href = "customer_list.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });

  // Handle customer list retrieval
  const getCustomerList = async () => {
    const token = localStorage.getItem("bearerToken");
    const customerListUrl = `${apiUrl}/assignment.jsp?cmd=get_customer_list`;

    const response = await sendApiRequest("GET", customerListUrl, {
      Authorization: `Bearer ${token}`,
    });

    if (response && Array.isArray(response)) {
      const tbody = document.querySelector("#customerTable tbody");
      tbody.innerHTML = "";

      response.forEach((customer) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${customer.first_name}</td>
          <td>${customer.last_name}</td>
          <td>${customer.email}</td>
          <td>${customer.phone}</td>
          <td><button class="deleteButton" data-uuid="${customer.uuid}">Delete</button></td>
        `;

        tbody.appendChild(row);
      });

      // Add event listener to delete buttons
      const deleteButtons = document.querySelectorAll(".deleteButton");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", deleteCustomer);
      });
    }
  };

  // Handle customer deletion
  const deleteCustomer = async (event) => {
    const token = localStorage.getItem("bearerToken");
    const uuid = event.target.dataset.uuid;
    const deleteUrl = `${apiUrl}/assignment.jsp?cmd=delete&uuid=${uuid}`;

    const response = await sendApiRequest("POST", deleteUrl, {
      Authorization: `Bearer ${token}`,
    });

    if (response && response.status === 200) {
      getCustomerList();
    } else {
      alert("Failed to delete the customer.");
    }
  };

  // Show customer list on customer_list.html
  if (window.location.pathname === "/customer_list.html") {
    getCustomerList();
  }

  // Handle "Add New Customer" button click
  const addCustomerButton = document.getElementById("addCustomerButton");
  if (addCustomerButton) {
    addCustomerButton.addEventListener("click", () => {
      window.location.href = "add_customer.html";
    });
  }

  // Handle add customer form submission
  const addCustomerForm = document.getElementById("addCustomerForm");
  if (addCustomerForm) {
    addCustomerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const token = localStorage.getItem("bearerToken");
      const createCustomerUrl = `${apiUrl}/assignment.jsp?cmd=create`;

      const requestBody = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        street: document.getElementById("street").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
      };

      const response = await sendApiRequest("POST", createCustomerUrl, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, JSON.stringify(requestBody));

      if (response && response.status === 201) {
        window.location.href = "customer_list.html";
      } else {
        alert("Failed to create the customer.");
      }
    });
  }
});
