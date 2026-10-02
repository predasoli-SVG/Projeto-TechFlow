document.addEventListener('DOMContentLoaded', () => {
    // Elementos do Modal
    const modal = document.getElementById('modal');
    const newOrderBtn = document.getElementById('newOrderBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const orderForm = document.getElementById('orderForm');

    // Elementos do Menu Mobile
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');

    // Elementos de Busca
    const searchOS = document.getElementById('searchOS');
    const osTable = document.getElementById('osTable');

    // Abrir Modal
    if (newOrderBtn && modal) {
        newOrderBtn.addEventListener('click', () => {
            modal.classList.add('show');
        });
    }

    // Fechar Modal no Botão X
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    // Fechar Modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Menu Mobile Toggle
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Cadastro de Nova Ordem de Serviço
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const client = document.getElementById('clientInput').value;
            const equipment = document.getElementById('equipmentInput').value;
            const tech = document.getElementById('techSelect').value;
            const status = document.getElementById('statusSelect').value;

            // Formatação de data (DD/MM/AA)
            const today = new Date();
            const dateStr = today.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            });

            // Classe do Badge de Status
            let badgeClass = 'open';
            if (status === 'Em andamento') badgeClass = 'progress';
            if (status === 'Concluída') badgeClass = 'completed';

            // Gerar ID fictício
            const osId = '#' + String(Math.floor(Math.random() * 900) + 100);

            // Inserir nova linha no topo da tabela
            if (osTable) {
                const tbody = osTable.querySelector('tbody');
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td><strong>${osId}</strong></td>
                    <td>${client}</td>
                    <td>${equipment}</td>
                    <td>${tech}</td>
                    <td><span class="badge ${badgeClass}">${status}</span></td>
                    <td>${dateStr}</td>
                    <td><button class="details-btn">Detalhes</button></td>
                `;
                tbody.prepend(newRow);
            }

            // Reseta formulário e fecha modal
            orderForm.reset();
            modal.classList.remove('show');
            alert('Ordem de Serviço cadastrada com sucesso!');
        });
    }

    // Filtro de Busca na Tabela de OS
    if (searchOS && osTable) {
        searchOS.addEventListener('input', (e) => {
            const filter = e.target.value.toLowerCase();
            const rows = osTable.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(filter) ? '' : 'none';
            });
        });
    }

    // Marcação do Menu Ativo
    const navLinks = document.querySelectorAll('.sidebar nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            if (window.innerWidth <= 800) {
                sidebar.classList.remove('open');
            }
        });
    });
});