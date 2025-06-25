// Get references to our input fields
let nomeCompletoInput = document.getElementById('nomeCompleto');
let emailInput = document.getElementById('email');
let telefoneInput = document.getElementById('telefone');
let dataNascimentoInput = document.getElementById('dataNascimento');
let btnSalvar = document.getElementById('btnSalvar');


let clientes = []; 
let indexEditado = null;

window.onload = () => {
const dadosSalvos = localStorage.getItem('clienteStorage')

    if (dadosSalvos) {
        clientes = JSON.parse(dadosSalvos)
        renderizarTabela()
    }
}

function salvarClientes() {
    localStorage.setItem('clienteStorage', JSON.stringify(clientes))
}




function renderizarTabela() {
    let linha = '';
    clientes.forEach((cliente, index) => {
        linha += `
            <tr>
                <td>${index + 1}</td> <td>${cliente.nomeCompleto}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.dataNascimento}</td>
                <td>
                    <button onclick="editarCliente(${index})" class="btn btn-sm btn-warning">Editar</button>
                    <button onclick="removerCliente(${index})" class="btn btn-sm btn-danger text-light">Remover</button>
                </td>
            </tr>
        `;
    });
    document.getElementById('clientesTabelaBody').innerHTML = linha;
}


function validarCampos() {
    if (nomeCompletoInput.value.trim() === '') {
        alert('O Nome Completo não pode ficar vazio.');
        nomeCompletoInput.focus();
        return false;
    }
    if (emailInput.value.trim() === '') {
        alert('O Email não pode ficar vazio.');
        emailInput.focus();
        return false;
    }
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        alert('Por favor, insira um email válido.');
        emailInput.focus();
        return false;
    }
    if (telefoneInput.value.trim() === '') {
        alert('O Número do Telefone não pode ficar vazio.');
        telefoneInput.focus();
        return false;
    }
    if (dataNascimentoInput.value.trim() === '') {
        alert('A Data de Nascimento não pode ficar vazia.');
        dataNascimentoInput.focus();
        return false;
    }
    return true;
}

function addCliente() {
    if (!validarCampos()) return;
    clientes.push({
        nomeCompleto: nomeCompletoInput.value.trim(),
        email: emailInput.value.trim(),
        telefone: telefoneInput.value.trim(),
        dataNascimento: dataNascimentoInput.value.trim()
    });

    salvarClientes()
    limparCampos();
    renderizarTabela();
}

function editarCliente(index) {
    const cliente = clientes[index];
    nomeCompletoInput.value = cliente.nomeCompleto;
    emailInput.value = cliente.email;
    telefoneInput.value = cliente.telefone;
    dataNascimentoInput.value = cliente.dataNascimento;

    indexEditado = index;
    btnSalvar.innerText = 'Editar Cliente';
    btnSalvar.onclick = atualizarCliente; 
}

function atualizarCliente() {
    if (!validarCampos()) return;

    clientes[indexEditado].nomeCompleto = nomeCompletoInput.value.trim();
    clientes[indexEditado].email = emailInput.value.trim();
    clientes[indexEditado].telefone = telefoneInput.value.trim();
    clientes[indexEditado].dataNascimento = dataNascimentoInput.value.trim();

    indexEditado = null;
    btnSalvar.innerText = 'Adicionar Cliente';
    btnSalvar.onclick = addCliente;
    limparCampos();
    renderizarTabela();
}


function removerCliente(index) {
    if (confirm('Tem certeza que deseja remover este cliente?')) { 
        clientes.splice(index, 1);
        renderizarTabela();
    }
}


function limparCampos() {
    nomeCompletoInput.value = '';
    emailInput.value = '';
    telefoneInput.value = '';
    dataNascimentoInput.value = '';
    nomeCompletoInput.focus(); 
}

salvarClientes()
btnSalvar.onclick = addCliente; 
renderizarTabela();

