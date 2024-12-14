/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/

// Scripts
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Event listener for the Register button
    const identitySelect = document.getElementById('exampleSelect');
    const registerBtn = document.getElementById('registerBtn');
    
    registerBtn.addEventListener('click', function() {
        const selectedIdentity = identitySelect.value;

        // Redirect user based on identity selected
        if (selectedIdentity === '1') {
            window.location.href = 'owner.html'; // Redirect to Owner's page
        } else if (selectedIdentity === '2') {
            window.location.href = 'investor_index.html'; // Redirect to Investor's page
        } else if (selectedIdentity === '3') {
            window.location.href = 'analyzer_index.html'; // Redirect to Analyzer's page
        }
    });

    // JavaScript to handle dynamic modal content
    function openMessageModal(analyzerName) {
        // Set the recipient name dynamically in the modal
        document.getElementById('recipient').value = analyzerName;
    }

    function sendMessage() {
        // Get the message and recipient values
        const recipient = document.getElementById('recipient').value;
        const message = document.getElementById('message').value;

        // Example logic for sending a message
        if (message.trim() === '') {
            alert('Please write a message before sending.');
        } else {
            alert(`Message sent to ${recipient}: ${message}`);
            // Close the modal
            const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
            messageModal.hide();

            // Clear the form
            document.getElementById('messageForm').reset();
        }
    }

    // Sample analyzer data (you would fetch this data from an API in a real application)
    const analyzers = [
        { id: 1, name: 'Analyzer 1', registrationDate: '2024-12-01', status: 'Active' },
        { id: 2, name: 'Analyzer 2', registrationDate: '2024-11-15', status: 'Inactive' },
        // More analyzers can be added dynamically here
    ];

    function loadAnalyzers() {
        const tableBody = document.querySelector('table tbody');
        tableBody.innerHTML = '';  // Clear existing table rows

        analyzers.forEach((analyzer, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${analyzer.name}</td>
                <td>${analyzer.registrationDate}</td>
                <td><span class="badge bg-${analyzer.status.toLowerCase()}">${analyzer.status}</span></td>
                <td>
                    <button 
                        class="btn btn-primary btn-sm" 
                        data-bs-toggle="modal" 
                        data-bs-target="#messageModal" 
                        onclick="openMessageModal('${analyzer.name}')">
                        Message
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Call the function to load analyzers when the page loads
    window.onload = loadAnalyzers;

});
