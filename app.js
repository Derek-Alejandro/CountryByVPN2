$(document).ready(function() {
    // Llama a esta función al cargar la página para obtener y mostrar el país por defecto
    getCountryByIP();

    // Botón para actualizar los registros del país actual
    $('#country-btn').click(function() {
        getCountryByIP();
    });

    // Función para obtener el país correspondiente a la IP detectada
    function getCountryByIP() {
        $.ajax({
            url: '//34.229.160.242/php-intro-connection/index.php', // URL del archivo PHP que detecta la IP
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                const countryName = response.country_name; // Supongamos que "country_name" contiene el nombre del país
                if (countryName) {
                    fetchData('country', 'Name', countryName); // Filtra los registros por nombre del país
                    $('#table-title').text(`Resultados para el país: ${countryName}`);
                } else {
                    alert("No se pudo detectar el país a partir de la IP.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error al obtener el país por IP:", xhr.responseText);
                alert("Error al obtener el país.");
            }
        });
    }

    // Función para obtener y filtrar datos de la tabla seleccionada
    function fetchData(table, field = '', value = '') {
        let url = `//34.229.160.242/php-intro-connection/getRecords.php?table=${table}`;
        if (field && value) {
            url += `&field=${field}&value=${value}`;
        }

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (Array.isArray(data) && data.length > 0) {
                    updateTable(data);
                } else {
                    alert("No se encontraron resultados.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error al obtener los datos:", xhr.responseText);
                alert("Error al obtener los datos.");
            }
        });
    }

    // Función para actualizar la tabla en la interfaz
    function updateTable(data) {
        const header = Object.keys(data[0]);
        $('#table-header').empty();
        header.forEach(col => {
            $('#table-header').append(`<th>${col}</th>`);
        });
        $('#table-body').empty();
        data.forEach(row => {
            const rowData = Object.values(row);
            const rowHtml = `<tr>${rowData.map(item => `<td>${item}</td>`).join('')}</tr>`;
            $('#table-body').append(rowHtml);
        });
    }

    // Función para capitalizar la primera letra de una cadena
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});











