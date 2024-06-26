//element selection and content loading
    document.addEventListener('DOMContentLoaded', () => {
    const fontFamilySelect = document.getElementById('fontFamily');
    const fontVariantSelect = document.getElementById('fontVariant');
    const italicSlider= document.getElementById('italic-slider');
    const editor = document.getElementById('editor');
    const main= document.getElementById('main');
    const saveButton=document.getElementById("save")
    const status=document.getElementById("status")
    
//change fontstyle with check uncheck
//italic slider
   italicSlider.addEventListener("click",function(){
    //editor.style.fontStyle="italic";
       if(italicSlider.checked==false){
        editor.style.fontStyle="normal";
       }
       else{
        editor.style.fontStyle="italic";
       }
       })
 
       //load saved content from localstorage
    editor.value=localStorage.getItem('save-content') || '';
   // Save content when the button is clicked
    saveButton.addEventListener('click', () => {
    localStorage.setItem('save-content', editor.value);
    status.textContent = 'saved';
    setTimeout(() => status.textContent = '', 5000); 
});
 
 // Fetch the list of Google Fonts
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyARQLfIXqmlqMQjRknRpXJXdKtJ1KPktM4`)
        .then(response => response.json())
        .then(data => {
            populateFontFamily(data.items);
        });

    function populateFontFamily(fonts) {
        fonts.forEach(font => {
            const option = document.createElement('option');
            option.value = font.family;
            option.textContent = font.family;
            fontFamilySelect.appendChild(option);
        });
    }

    fontFamilySelect.addEventListener('change', updateEditorStyle);
    fontVariantSelect.addEventListener('change', updateEditorStyle);


    function updateEditorStyle() {
        const fontFamily = fontFamilySelect.value;
        const fontVariant = fontVariantSelect.value;
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@${fontVariant}&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        editor.style.fontFamily = fontFamily;
        editor.style.fontWeight = fontVariant;
    }
    
 
     
    
   
});

