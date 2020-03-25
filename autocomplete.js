// Refactoring and ceating fully reasuable widget

const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {
    
    // Create HTML block where movies will be displayed
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown"> 
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div
    `;
    const input  = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    
    const onInput = async event => {
      const items = await fetchData(event.target.value);
      if(!items.length){
        dropdown.classList.remove('is-active');
        return;
      }
      resultsWrapper.innerHTML = '';
      dropdown.classList.add('is-active');
    //   Create a loop which takes a data from the movie array
     
      for (let item of items) {
        const option = document.createElement('a');
        
          option.classList.add('dropdown-item');
          option.innerHTML = renderOption(item);
          option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = inputValue(item);
    
            onOptionSelect(item);
          });
      
        //   Render the data in to the DOM
          resultsWrapper .appendChild(option);
        
      }
    };
    input.addEventListener('input', debouncer(onInput, 500));
   
    // Create a method to close the dropdown menu when the user clicks outside of ROOT target scope
    document.addEventListener('click', event =>{
        if(!root.contains(event.target)){
            dropdown.classList.remove('is-active');
        }
    })
};

