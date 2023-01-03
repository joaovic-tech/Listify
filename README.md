# To-do list with NodeJS
* Task management app

## Lista de afazeres:
[x] ***Important***
[x] ***Reminder***
    * Definir `data/hora` do lembrete
[x] ***Repeat***
    * Definir `data/hora` da repetição por exemplo:
      [x] Diariamente
      [x] Personalizado - Exemplo:
        [x] Dom
        [x] Seg
        [x] Ter
        [x] Qua
        [x] Qui
        [x] Sex
        [x] Sáb
    **Nota: O usuário pode escolher qualquer dia da semana**
    __Quando clicar em algumas dessas opções abri outro modal para escolher o horário__
[x] Conclusion
    * Definir `data/hora` da conclusão
    * A conclusão é ***Obrigatória*** se o usuário não tem data pata concluir:
        * Atribuir um valor padrão de `Sem data para conclusão`
---

#### Mostrar as tarefas
* Quando for mostrar as tarefas criar algo parecido como:
    [ ] uma `ul>li` para listar todas as tarefas
    [ ] Dentro desses `li's` um form parecido com o de criar uma task
        * Esse form precisar ser criado dinamicamente sem usar o método clone()
        * Fiz um exemplo logo abaixo de como fazer submit de cada form com o mesmo id
        * Lembrando que para pegar os elementos do form utilizar o `this.form`

html:
```html
<ul>
  <li>
    <form id="teste-form">
      <input type="text" name="teste" id="teste">
    </form>
  </li>
  <li>
    <form id="teste-form">
      <input type="text" name="teste" id="teste">
    </form>
  </li>
</ul>
```

js:
```js
class TesteForms {
  constructor(form) {
    this.form = form;
    this.input = this.form.querySelector('#teste');
  }

  init() {
    this.form.style.margin = '2rem';
    const formData = new FormData(this.form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log(data);
  }
}

document.addEventListener('submit', (e) => {
  e.preventDefault();
  const el = e.target;
  const formsExist = el.id === 'teste-form';

  if (formsExist) {
    const testeForms = new TesteForms(el);
    testeForms.init();
  }
});
```