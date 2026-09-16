const menu = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const modal = document.getElementById("modal");
const newOrder = document.getElementById("newOrderBtn");
const closeModal = document.getElementById("closeModal");
const form = document.getElementById("orderForm");

menu.onclick = () => sidebar.classList.toggle("open");

document.querySelectorAll(".sidebar a").forEach(link => {
    link.onclick = () => {
        document.querySelectorAll(".sidebar a").forEach(a => a.classList.remove("active"));
        link.classList.add("active");
        sidebar.classList.remove("open");
    };
});

newOrder.onclick = () => modal.classList.add("show");

closeModal.onclick = () => modal.classList.remove("show");

modal.onclick = e => {
    if (e.target === modal) modal.classList.remove("show");
};

form.onsubmit = e => {
    e.preventDefault();
    alert("Ordem de Serviço criada com sucesso!");
    form.reset();
    modal.classList.remove("show");
};