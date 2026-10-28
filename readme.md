# TechFlow — Guia de uso e desenvolvimento

A TechFlow é uma interface para gestão de Ordens de Serviço (OS), com páginas para clientes, administradores e técnicos. Este README explica como executar o projeto, usar os atributos do HTML e manter os padrões de estilo e nomenclatura.

**A versão atual contém somente HTML, CSS e imagens. Não possui JavaScript, API, banco de dados nem autenticação.** Os painéis exibem dados estáticos. O formulário de serviço permite preencher informações e abrir uma orientação, mas não envia nem registra pedidos.

## 1. Organização dos arquivos

Coloque este `README.md` na raiz do projeto, ao lado das pastas abaixo. Os caminhos e as diferenças entre letras maiúsculas e minúsculas devem ser preservados.

| Caminho | Finalidade |
| --- | --- |
| `tela-principal/index.html` | Página inicial e navegação para as áreas do sistema. |
| `tela-login/index.html` | Seleção visual do perfil Administrador ou Técnico. |
| `techflow-Login-cliente/index.html` | Formulários visuais de acesso e cadastro do cliente. |
| `techflow-solicitacao/index.html` | Formulário de solicitação de serviço, sem pagamento. |
| `tela-admin/index.html` | Painel administrativo, tabela de OS e consultas. |
| `tela-tecnico/index.html` | Cartões de serviços, filtros e consultas do técnico. |
| `style.css`, dentro de cada pasta de tela | Estilos específicos daquela página. |
| `assets/globais.css` | Reset, variáveis e componentes compartilhados por cinco telas. |
| `img/LOGO.png` | Logomarca utilizada nas páginas. |
| `LEIA-ME.txt` | Orientações resumidas de execução da versão entregue. |

A página de solicitação carrega apenas seu próprio `style.css`, que também contém suas definições básicas. As outras cinco páginas carregam primeiro `assets/globais.css` e depois seu `style.css`. Essa ordem permite que os ajustes locais prevaleçam sobre regras compartilhadas.

## 2. Como executar localmente

### Opção A — Abrir no navegador

1. Extraia todo o ZIP para uma pasta.
2. Mantenha as pastas e imagens na mesma estrutura.
3. Abra `tela-principal/index.html` no navegador.
4. Use os links para navegar entre as páginas.

### Opção B — Visual Studio Code com Live Server

1. Abra a pasta raiz do projeto no Visual Studio Code.
2. Instale a extensão **Live Server**, caso ainda não esteja instalada.
3. Clique com o botão direito em `tela-principal/index.html`.
4. Escolha **Open with Live Server**.
5. Utilize o endereço aberto pela extensão; a porta depende da configuração local.

### Opção C — Servidor local com Python

Com Python instalado, execute **na raiz do projeto**:

```bash
python3 -m http.server 8000
```

No Windows, se utilizar o inicializador `py`:

```powershell
py -m http.server 8000
```

Depois, acesse [http://localhost:8000/tela-principal/index.html](http://localhost:8000/tela-principal/index.html). Use `Ctrl+C` no terminal para encerrar o servidor.

Não é necessário executar `npm install`, configurar banco de dados ou criar um arquivo `.env` para esta versão.

### Credenciais e acesso às telas

**Não existem credenciais necessárias nesta entrega.** Os formulários de login apenas validam os campos básicos do HTML e permitem navegar para outra página. Não verificam identidade ou senha e não criam sessões. O cadastro do cliente também não grava uma conta.

- Em `tela-login/index.html`, selecione Administrador ou Técnico, preencha os campos obrigatórios e continue para o painel escolhido.
- Em `techflow-Login-cliente/index.html`, preencha os campos obrigatórios para continuar até a solicitação.
- Os painéis também podem ser abertos diretamente por seus arquivos HTML.

Quando houver integração com um back-end, as instruções de credenciais deverão ser fornecidas na documentação desse serviço e incorporadas a este guia. Não coloque senhas reais, chaves ou tokens no HTML, no CSS ou neste README.

## 3. Atributos HTML: o que realmente ativa cada comportamento

### Atributos personalizados `data-*`

Atributos `data-*` guardam informações personalizadas. **Eles não ativam comportamentos sozinhos.** É necessário que algum CSS ou código os utilize.

Nesta versão, o único atributo personalizado encontrado é:

| Atributo | Onde aparece | Comportamento atual |
| --- | --- | --- |
| `data-sair` | Links de saída do administrador e do técnico. | É um marcador remanescente. Não há código que o utilize. A navegação ocorre pelo `href` do link; não existe sessão para encerrar. |

O exemplo abaixo mostra como interpretar o atributo já existente:

```html
<a href="../tela-login/index.html" data-sair>Sair do sistema</a>
```

Não há suporte a `data-theme="dark"` ou a outros parâmetros de tema. Acrescentar esse atributo ao `<body>` não muda as cores atuais.

Se um atributo personalizado for necessário em uma alteração futura, use letras minúsculas e traços, explique sua finalidade neste README e identifique a regra CSS que o utiliza. Não introduza atributos que prometam ações inexistentes.

### Atributos nativos usados no projeto

As interações atuais dependem de recursos nativos do navegador e seletores CSS:

| Atributo ou estado | Como e quando usar |
| --- | --- |
| `id` | Identifica um elemento. Deve ser único dentro da mesma página. |
| `href="#identificador"` | Navega para uma seção ou altera o alvo usado pelo seletor CSS `:target`. |
| `for="identificador"` | Associa um `<label>` ao `id` de um campo. É usado no menu e nas abas. |
| `type="checkbox"` | Mantém um estado marcado/desmarcado, como o controle do menu no celular. |
| `type="radio"` e `name` | Agrupam opções exclusivas. Opções do mesmo grupo compartilham o mesmo `name`. |
| `checked` | Define a opção inicial. Use somente um `checked` por grupo de radios. |
| `value` | Define o valor da opção. Alguns valores também são usados literalmente pelos seletores CSS. |
| `popover="auto"` | Define uma janela nativa, inicialmente fechada. |
| `popovertarget="identificador"` | Faz um botão controlar a janela com o `id` informado. |
| `popovertargetaction="hide"` | Fecha a janela indicada pelo botão. |
| `type="button"` | Define um botão que não envia o formulário. Use nos controles das janelas. |
| `action` e `formaction` | Definem o destino da navegação do formulário; não implementam autenticação. |
| `required`, `minlength`, `maxlength` e `type="email"` | Aplicam as restrições declaradas no HTML quando a validação nativa é acionada. Não substituem validação no servidor. |
| `disabled` | Mantém indisponível uma ação que ainda depende do sistema de atendimento. Não remova apenas para fazer o botão parecer ativo. |
| `details` e `summary` | Abrem e fecham perguntas frequentes sem scripts. |

Exemplo de janela sem JavaScript:

```html
<button type="button" popovertarget="detalhes-servico">
    Ver detalhes
</button>

<section id="detalhes-servico" popover="auto">
    <h2>Detalhes do serviço</h2>
    <p>Informações do atendimento.</p>
    <button
        type="button"
        popovertarget="detalhes-servico"
        popovertargetaction="hide"
    >
        Fechar
    </button>
</section>
```

Use nomes únicos se copiar esse exemplo. Mantenha o texto dos botões claro e acessível.

### Relações entre HTML e CSS que devem ser preservadas

| Área | Definições utilizadas |
| --- | --- |
| Menu móvel | `id="abrir-menu"`, seu `label` e `#menu`. O CSS usa o estado `:checked`. |
| Etapas da principal | Radios `etapa-1`, `etapa-2` e `etapa-3`, agrupados com `name="etapa"`. A ordem entre controles e painéis é usada pelo seletor de irmãos `~`. |
| Acesso/cadastro do cliente | Links para `#area-cadastro` e `#area-entrar`; o CSS usa `:target` e `:has()`. |
| Perfil da equipe | `name="perfil"`, com valores `admin` e `tecnico`; `formaction` direciona ao painel correspondente. |
| Categoria do equipamento | `name="categoria"`, com valores `Computador`, `Impressora`, `Ar-condicionado` e `Outro`. |
| Serviço solicitado | `name="servico"`, com valores `diagnostico`, `limpeza` e `manutencao`. |
| Modalidade | `name="modalidade"`, com valores `loja` e `domicilio`; controla a exibição do endereço. |
| Filtro administrativo | `#filtro-status`, com valores `todos`, `pendente`, `andamento` e `concluida`. |
| Filtro do técnico | Radios com `name="status-tecnico"` e os mesmos quatro valores de status. |
| Profissional no painel técnico | `#tecnico-atual`, com valores `todos`, `rafael` e `camila`. |

Não altere esses IDs, valores, nomes ou posições sem ajustar os seletores correspondentes. Os filtros ocultam e mostram linhas ou cartões existentes; não consultam dados nem recalculam os indicadores.

O resumo da solicitação acompanha visualmente categoria, serviço e modalidade. Ele não copia o nome, o texto digitado ou a data para outro elemento. A data atual também não é calculada automaticamente nesta versão.

## 4. Regras de uso do CSS e das cores

### Paleta já declarada

As variáveis compartilhadas ficam no `:root` de `assets/globais.css`. A solicitação possui sua própria declaração `:root` em `techflow-solicitacao/style.css`.

| Variável | Paleta compartilhada | Paleta da solicitação | Uso esperado |
| --- | --- | --- | --- |
| `--azul-escuro` | `#123f83` | `#153952` | Destaques e títulos. |
| `--azul` | `#2369c4` | `#175b91` | Ações principais. |
| `--ciano` | `#04bfd8` | `#21a6c0` | Realces da identidade visual. |
| `--cinza` | `#747d88` | Não declarada | Informações secundárias. |
| `--texto` | `#203047` | `#35566f` | Texto principal. |
| `--fundo` | `#f4f7fb` | `#f4f8fc` | Fundo da página. |
| `--branco` | `#ffffff` | Não declarada | Superfícies e texto sobre fundos escuros. |
| `--borda` | `#dce4ef` | `#dce7ef` | Separadores e contornos. |

A solicitação não importa `globais.css`. Portanto, uma variável declarada apenas no arquivo compartilhado não está disponível automaticamente nela.

### Regra obrigatória para novas alterações

**É proibido criar cores fora das variáveis estabelecidas.** Em regras de componentes, use `var(--nome-da-variavel)` em vez de acrescentar valores hexadecimais, nomes de cores, `rgb()`, `rgba()` ou `hsl()` diretamente.

Exemplo para uma página que carrega `globais.css`:

```css
.botao-salvar {
    background-color: var(--azul);
    color: var(--branco);
    border: 1px solid var(--borda);
}
```

Siga estas regras:

1. Escolha uma variável já disponível na página.
2. Se precisar de um papel visual ainda não representado, revise a paleta e centralize a nova definição em `:root` antes de utilizá-la. Documente nome, finalidade e valor neste guia.
3. Não redefina variáveis dentro de componentes ou de estilos inline para introduzir cores escondidas.
4. Use as variáveis também ao criar gradientes, sombras e estados de interação. `transparent`, `currentColor` e `inherit` podem ser usados quando expressarem transparência ou herança, sem criar um novo tom.
5. Alterar uma variável compartilhada afeta todas as páginas que a utilizam. Confira o resultado antes de concluir a mudança.

**Estado atual do código:** ainda existem cores literais em regras antigas. Elas são uma pendência de padronização, e não um exemplo para novas alterações. Esta documentação não significa que esses valores já foram migrados. Ao revisar um componente, substitua cores por variáveis adequadas e confira se o visual foi preservado.

### Organização dos estilos

- Use CSS puro, com uma propriedade por linha e indentação consistente.
- Mantenha definições compartilhadas em `assets/globais.css` e ajustes da tela no seu `style.css`.
- Preserve a autonomia atual da página de solicitação ao editar sua paleta.
- Use Flexbox para organizar as áreas principais e media queries para telas menores.
- Escreva comentários em português para separar os blocos.
- Preserve indicadores de foco e a navegação por teclado.
- Não esconda controles de formulário com `display: none` quando eles precisarem continuar acessíveis pelo teclado. Use o padrão `.controle-css` existente.
- Não adicione frameworks, bibliotecas de interface, estilos inline ou JavaScript nesta versão.

## 5. Padrões de nomenclatura

### Classes e IDs

Para novos nomes, use **português, letras minúsculas e palavras separadas por traço**: o formato conhecido como `kebab-case`. Evite acentos, espaços e abreviações difíceis de entender.

| Tipo | Exemplos |
| --- | --- |
| Estrutura | `.cabecalho`, `.menu-lateral`, `.coluna-resumo` |
| Componente | `.cartao-servico`, `.botao-salvar`, `.titulo-painel` |
| Identificação única | `#formulario-servico`, `#campo-endereco`, `#abrir-menu` |
| Estado visual | `.pendente`, `.andamento`, `.concluida` |
| Atributo personalizado, se necessário | `data-nome-do-atributo` |

Uma classe pode aparecer em vários elementos. Um ID deve aparecer uma única vez por página.

Há nomes antigos que não seguem completamente esse padrão. Não os renomeie isoladamente: atualize também seletores, links, `for`, `popovertarget` e demais referências. Preserve os nomes atuais das pastas, inclusive `techflow-Login-cliente`, enquanto seus caminhos não forem revisados em conjunto.

### Funções JavaScript

O padrão de funções **não se aplica à entrega atual, porque ela não contém JavaScript**. Não acrescente scripts para implementar os exemplos deste guia.

Se uma etapa futura do projeto autorizar funções JavaScript, adote nomes em português, em `camelCase`, começando com verbos: `validarFormulario`, `carregarOrdens` e `salvarSolicitacao`. Essa é uma orientação futura, não uma dependência existente.

## 6. Conferência antes de entregar uma alteração

- Abra as seis páginas e confira os links e as imagens.
- Confira o layout no celular e no computador, inclusive tabelas com rolagem própria.
- Teste o menu, as abas, os filtros, os detalhes e as perguntas frequentes com JavaScript desativado.
- Confira se `for`, `href` e `popovertarget` apontam para IDs existentes e únicos.
- Preserve os valores dos controles utilizados pelos seletores CSS.
- Verifique se novas cores foram definidas e utilizadas por variáveis.
- Confirme que não foram adicionados arquivos `.js`, tags de script, eventos inline ou URLs que executem JavaScript.
- Atualize este README quando mudar atributos, paleta, caminhos ou regras de uso.

Login real, persistência, envio de solicitações e atualização de OS pertencem a uma futura integração com o back-end. A área de pagamento não faz parte desta versão.
