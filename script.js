// Expanded data for materials and properties
const materialData = {
    strength: {
        labels: ["Wood", "Steel", "Concrete", "Composite", "Masonry", "Timber", "Glass", "Plastic"],
        values: [800, 25000, 5000, 15000, 3000, 2000, 1000, 1500],
        unit: "PSI"
    },
    cost: {
        labels: ["Wood", "Steel", "Concrete", "Composite", "Masonry", "Timber", "Glass", "Plastic"],
        values: [50, 300, 100, 200, 80, 120, 150, 250],
        unit: "USD/m³"
    },
    weathering: {
        labels: ["Wood", "Steel", "Concrete", "Composite", "Masonry", "Timber", "Glass", "Plastic"],
        values: [40, 60, 80, 70, 75, 60, 55, 45],
        unit: "Rating (0-100)"
    },
    fireResistance: {
        labels: ["Wood", "Steel", "Concrete", "Composite", "Masonry", "Timber", "Glass", "Plastic"],
        values: [30, 80, 90, 70, 85, 65, 75, 50],
        unit: "Rating (0-100)"
    },
    durability: {
        labels: ["Wood", "Steel", "Concrete", "Composite", "Masonry", "Timber", "Glass", "Plastic"],
        values: [50, 90, 85, 80, 75, 60, 70, 60],
        unit: "Rating (0-100)"
    },
    sustainability: {
        labels: ["Wood", "Steel", "Concrete", "Composite", "Masonry", "Timber", "Glass", "Plastic"],
        values: [80, 40, 60, 50, 55, 65, 45, 35],
        unit: "Rating (0-100)"
    },
    aesthetics: {
        labels: ["Wood", "Steel", "Concrete", "Composite", "Masonry", "Timber", "Glass", "Plastic"],
        values: [85, 60, 50, 70, 40, 75, 95, 55],
        unit: "Rating (0-100)"
    },
    workability: {
        labels: ["Wood", "Steel", "Concrete", "Composite", "Masonry", "Timber", "Glass", "Plastic"],
        values: [80, 50, 60, 70, 50, 80, 30, 60],
        unit: "Rating (0-100)"
    }
};

let currentProperty = "strength";

// Initialize Chart
const ctx = document.getElementById("materialChart").getContext("2d");
let materialChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: materialData[currentProperty].labels,
        datasets: [{
            label: `${capitalize(currentProperty)} (${materialData[currentProperty].unit})`,
            data: materialData[currentProperty].values,
            backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#8e44ad", "#16a085", "#f39c12", "#c0392b"],
            borderColor: ["#388e3c", "#1976d2", "#f57c00", "#7b1fa2", "#7d3c98", "#0e6655", "#d68910", "#922b21"],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: `${capitalize(currentProperty)} (${materialData[currentProperty].unit})`
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw} ${materialData[currentProperty].unit}`;
                    }
                }
            }
        }
    }
});

// Function to update chart and table
function updateChart() {
    const property = document.getElementById("property").value;
    currentProperty = property;

    // Update chart data and labels
    materialChart.data.labels = materialData[property].labels;
    materialChart.data.datasets[0].label = `${capitalize(property)} (${materialData[property].unit})`;
    materialChart.data.datasets[0].data = materialData[property].values;
    materialChart.options.scales.y.title.text = `${capitalize(property)} (${materialData[property].unit})`;
    materialChart.update();

    // Update table
    updateTable(property);
}

// Helper to populate table based on selected property
function updateTable(property) {
    const tbody = document.querySelector("#materialTable tbody");
    tbody.innerHTML = "";  // Clear table contents
    const labels = materialData[property].labels;
    const values = materialData[property].values;
    const unit = materialData[property].unit;

    labels.forEach((label, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${label}</td>
            <td>${capitalize(property)}</td>
            <td>${values[index]}</td>
            <td>${unit}</td>
        `;
        tbody.appendChild(row);
    });
}

// Initial table population
updateTable(currentProperty);

// Capitalize function
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
