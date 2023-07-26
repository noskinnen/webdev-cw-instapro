  export  const renderComments = (commentArray) => {
    const listElement = document.getElementById("comment-list");
    const commentHtml = commentArray.map((item, index) => {
      let activeLike = '';
      if (commentArray[index].isActiveLike) {
        activeLike = '-active-like'
      }
      return `  
      <li class="comment">
        <div class="comment-header">
          <div> ${item.name} </div>
          <div> ${item.date} </div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${item.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">
              ${item.likes}
            </span>
            <button class="like-button ${activeLike}" data-id="${item.id}" data-index="${index}"></button>
          </div>
        </div>
      </li>`
`
      <li class="post">
                    <div class="post-header" data-user-id="642d00329b190443860c2f31">
                        <img src="https://www.imgonline.com.ua/examples/bee-on-daisy.jpg" class="post-header__user-image">
                        <p class="post-header__user-name">Иван Иваныч</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="https://www.imgonline.com.ua/examples/bee-on-daisy.jpg">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="642d00579b190443860c2f32" class="like-button">
                        <img src="./assets/images/like-active.svg">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>2</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">Иван Иваныч</span>
                      Ромашка, ромашка...
                    </p>
                    <p class="post-date">
                      19 минут назад
                    </p>
                  </li>`
    }).join('');
    listElement.innerHTML = commentHtml;

  }

  export const renderApp = (commentArray) => {
    const appElement = document.getElementById('app');
    if (!token) {
      renderLogin (appElement, fetchComments);
      return 
    }

    const commentHtml = commentArray.map((item, index) => {
      let activeLike = '';
      if (commentArray[index].isActiveLike) {
        activeLike = '-active-like'
      }
      return `  
      <li class="comment">
        <div class="comment-header">
          <div> ${item.name} </div>
          <div> ${item.date} </div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${item.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">
              ${item.likes}
            </span>
            <button class="like-button ${activeLike}" data-id="${item.id}" data-index="${index}"></button>
          </div>
        </div>
      </li>`
    }).join('');

    const appHtml = `
    
    <ul class="comments" id="comment-list">
       ${commentHtml} 
    </ul>
    <div class="dpnone text-wile">
Пожалуйста подождите,комментарий загружается...
    </div>

    <div class="add-form">
      <input type="text" class="add-form-name" id="input-name" value=${currentUser} disabled/>
      <textarea
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш комментарий"
        id="input-text"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button class="add-form-button add-form-button_disabled" id="add-button" disabled>Написать</button>
      </div>
    </div>`
    appElement.innerHTML = appHtml; 

    const buttonElement = document.getElementById("add-button");
    const nameElement = document.getElementById("input-name");
    const textElement = document.getElementById("input-text");

    nameElement.addEventListener('input', () => {
      letDisabledButton(nameElement.value);
    });
    textElement.addEventListener('input', () => {
      letDisabledButton(textElement.value);
    });
    nameElement.addEventListener('click', () => {
      letClearForm(nameElement);
    });
    textElement.addEventListener('click', () => {
      letClearForm(textElement);
    });

    buttonElement.addEventListener('click', sentComment);

    document.addEventListener('keyup', (e) => {
     if (e.code === 'Enter') {
       sentComment();
     }
    })

    initUpdateLike(commentArray); 
    initAnswerComment(); 
  }
