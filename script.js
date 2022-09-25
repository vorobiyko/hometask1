let arrNote = []
let notesHTML = '';
let header = `
    <tr class="nav-tr">
                <td class="task-logo"><h1>Name</h1></td>
                <td class="created"><h1>Created</h1></td>
                <td class="nav-category"><h1>Category</h1></td>
                <td class="nav-content"><h1>Content</h1></td>
                <td class="nav-dates"><h1>Dates</h1></td>
                <td class="nav-buttons-interface">
                    <div class="nav-icons">
                        <img class="icons open-archive" src="./icons/archive.svg">
                    </div>
                </td>
            </tr>
    `
const listNote = document.querySelector('.table-node');
let formAdd = document.querySelector('.add-note-form')
let formChange = document.querySelector('.change-note-form')
let inputName = document.getElementById('name')
let inputContent = document.getElementById('content')
let inputDatas = document.getElementById('dates')
let category = document.getElementById('category-choose')
let inputNameChange = document.getElementById('change-name')
let inputContentChange = document.getElementById('change-content')
let inputDatasChange = document.getElementById('change-dates')
let categoryChange = document.getElementById('change-category-choose')
let closeNote = document.querySelector('.delete')
let add_note = document.querySelector('.save')
let closeBtn = document.querySelector('.close')


//load default note-----------------------------------------------------------------------------------------------------
const renderNotes = () => {
    arrNote.map(el => notesHTML += el)
    listNote.innerHTML = header + notesHTML
}
const loadNote = () => {
    let countNote = 7;
    let i = 0;

    const note = (i) => {
        return `
        <tr class="task current-note active-note" id=task+${i}>
            <td class="task-logo">
                 <div class="task-logo-description">
                     <img src='./icons/gear.svg'>
                     <h3 title="Shopping list ${i}">Shopping list ${i}</h3>
                 </div>
            </td>
            <td class="data">
                <h3 title="Wed, 21 Sep 2022">Wed, 21 Sep 2022</h3>
            </td>
            <td class="category">
                <h3 title="Random Thought">Random Thought</h3>
            </td>
            <td class="content">
                <h3 title="Tomatoes, bread">Tomatoes, bread</h3>
            </td>
            <td class="dates">
                <h3 title="2022-09-04">2022-09-04</h3>
            </td>
            <td class="buttons-interface">
                <div class="buttons-icons nav-icons">
                    <img class="icons change-write" id=${i} src="./icons/write.svg">
                    <img class="icons archive-btn" id=${'archive'+i} src="./icons/archive.svg">
                    <img class="icons delete-note" id=${"deleteBtn"+i}  src="./icons/trash.svg">
                </div>
            </td>
        </tr>
    `}
    for (let j = 0; j < countNote; j++) {
        arrNote[j] = note(i)
        i++
    }
    renderNotes()
}

loadNote();
//----------------------------------------------------------------------------------------------------------------------


//object path icons-----------------------------------------------------------------------------------------------------
let img = {
    'Random Thought':'./icons/gear.svg',
    'Idea':'./icons/idea.svg',
    'Task':'./icons/task.svg'
}

//----------------------------------------------------------------------------------------------------------------------


//method adding event-listener for buttons change-----------------------------------------------------------------------

const getAllBtnChange = () => {
    let listBtn1 =  document.querySelectorAll(".change-write")
    listBtn1.forEach(el=>el.addEventListener('click',()=>{
        changeNote(el.id)
    }))
}
getAllBtnChange();
//----------------------------------------------------------------------------------------------------------------------



//edit notes------------------------------------------------------------------------------------------------------------
const changeNote = (id) => {
    let changeBtn = document.querySelector('.change')
    let numberId = parseInt(id.match(/\d+/))
    let currentNote = document.getElementById(`task+${numberId}`)
    let textName = currentNote.children[0].innerText
    let textCategory = currentNote.children[2].innerText
    let textContent = currentNote.children[3].innerText
    inputNameChange.value = textName
    categoryChange.value = textCategory
    inputContentChange.value = textContent
    formChange.style.display = 'flex';
    btnAdd.style.pointerEvents = 'none'
    formChange.addEventListener('submit',(e)=>{
        e.preventDefault();
    })
    changeBtn.addEventListener('click', ()=>{
        setValue(currentNote)
    },{once: true})
    closeBtn.addEventListener('click',()=>{
        formChange.style.display = 'none'
        btnAdd.style.pointerEvents = 'auto'
    })
    AnalystNote()
}
//----------------------------------------------------------------------------------------------------------------------


//saving the changed value----------------------------------------------------------------------------------------------
const setValue = (currentNote) => {
    btnAdd.style.pointerEvents = 'auto'
    formChange.style.display = 'none'
    let iconsCategory = currentNote.children[0].children[0].children[0]
    let nameNote = currentNote.children[0].children[0].children[1]
    let categoryNote = currentNote.children[2].children[0]
    let contentNote = currentNote.children[3].children[0]
    let datesNote = currentNote.children[4].children[0]
    let pathIcon = ''
    let textDates = currentNote.children[4].innerText
    Object.entries(img).map(([key,value])=>key==categoryChange.value?pathIcon=value:'')
    iconsCategory.src = pathIcon
    nameNote.innerText = inputNameChange.value
    categoryNote.innerText = categoryChange.value
    contentNote.innerText = inputContentChange.value
    datesNote.innerText = textDates+'  '+inputDatasChange.value

    nameNote.title = inputNameChange.value
    categoryNote.title = categoryChange.value
    contentNote.title = inputContentChange.value
    datesNote.title = textDates+' '+inputDatasChange.value
    AnalystNote()
}
//----------------------------------------------------------------------------------------------------------------------


//parameters for create note--------------------------------------------------------------------------------------------
let data = new Date().toUTCString()
let paramsNote = {
    icon: img.Idea,
    name: '',
    created: data,
    category: '',
    content: 'Tomatoes, bread',
    dates: '3/5/2021, 5/5/2021'
}
//----------------------------------------------------------------------------------------------------------------------
let btnAdd = document.querySelector('.create-note')


//add and save new notes------------------------------------------------------------------------------------------------
const saveNote = () => {
    listNote.style.pointerEvents = 'auto';
    btnAdd.style.pointerEvents = 'auto'
    formAdd.style.display = 'none'
    let valueCategory = category.value
    let pathIcon = ''
    Object.entries(img).map(([key,value])=>key==valueCategory?pathIcon=value:'')
    paramsNote.icon = pathIcon
    paramsNote.name = inputName.value
    paramsNote.created = data
    paramsNote.category = valueCategory
    paramsNote.content = inputContent.value
    paramsNote.dates = inputDatas.value
    let newNote = `
        <tr class="task current-note active-note" id=task+${arrNote.length}>
            <td class="task-logo">
                 <div class="task-logo-description">
                     <img src=${paramsNote.icon}>
                     <h3 title="${paramsNote.name}">${paramsNote.name}</h3>
                 </div>
            </td>
            <td class="data">
                <h3 title="${paramsNote.created}">${paramsNote.created}</h3>
            </td>
            <td class="category">
                <h3 title="${paramsNote.category}">${paramsNote.category}</h3>
            </td>
            <td class="content">
                <h3 title="${paramsNote.content}">${paramsNote.content}</h3>
            </td>
            <td class="dates">
                <h3 title="${paramsNote.dates}">${paramsNote.dates}</h3>
            </td>
            <td class="buttons-interface">
                <div class="buttons-icons nav-icons">
                    <img class="icons change-write" id=${arrNote.length} src="./icons/write.svg">
                    <img class="icons archive-btn" id=${'archive'+arrNote.length} src="./icons/archive.svg">
                     <img class="icons delete-note" id=${"deleteBtn"+arrNote.length} src="./icons/trash.svg">
                </div>
            </td>
        </tr>
        `
    arrNote.push(newNote)
    listNote.innerHTML += newNote
    getAllBtnDelete()
    getAllBtnChange()
    AnalystNote()
    getAllBtnArchive()
    openArchiveNotes()
}
//----------------------------------------------------------------------------------------------------------------------


//opens a field for entering information to create a note or closes a field---------------------------------------------
const addNote = () => {
    formAdd.style.display = 'flex'
    formAdd.addEventListener('submit',(e)=>{
        e.preventDefault();
    })
    closeNote.addEventListener('click',()=>{
        listNote.style.pointerEvents = 'auto';
        formAdd.style.display = 'none'
        formChange.style.display = 'none';
        btnAdd.style.pointerEvents = 'auto'
        inputName.value = null
        inputContent.value = null
        inputDatas.value = null
        category.value = 'Idea'
    })
    add_note.addEventListener('click',saveNote)
}
//----------------------------------------------------------------------------------------------------------------------


//event listener for button create note---------------------------------------------------------------------------------
btnAdd.addEventListener('click',()=>{
    listNote.style.pointerEvents = 'none';
    btnAdd.style.pointerEvents = 'none'
    addNote();
    getAllBtnDelete();
    getAllBtnChange();
    openArchiveNotes()
})
//----------------------------------------------------------------------------------------------------------------------


//method adding event-listener for buttons delete-----------------------------------------------------------------------
const getAllBtnDelete = () => {
    let listBtn =  document.querySelectorAll(".delete-note")
        listBtn.forEach(el=>el.addEventListener('click',()=>{
            deleteNote(el.id)
        }))
}
getAllBtnDelete()
//----------------------------------------------------------------------------------------------------------------------


//Remove notes----------------------------------------------------------------------------------------------------------
const deleteNote = (id) => {
    let numberId = parseInt(id.match(/\d+/))
    let currentNote = document.getElementById(`task+${numberId}`)
    currentNote.remove()
    arrNote.splice(numberId,1)
    AnalystNote()
    openArchiveNotes()
}
//----------------------------------------------------------------------------------------------------------------------



//method that analyzes categories and the number of active and archived notes-------------------------------------------
const AnalystNote = () => {
    let allArchived = document.querySelectorAll('.archive')
    let allActive = document.querySelectorAll('.active-note')
    let allCategoryActive = []
    let allCategoryArchived = []
    let listRandomTh = []
    let listIdea = []
    let listTask = []
    let listRandomThArch = []
    let listIdeaArch = []
    let listTaskArch = []
    let randomThAmount = document.getElementById('randomTh')
    let ideaAmount = document.getElementById('idea')
    let taskAmount = document.getElementById('task-category')
    let randomThArchAmount = document.getElementById('randomTh-category-archived')
    let ideaArchAmount = document.getElementById('idea-category-archived')
    let taskArchAmount = document.getElementById('task-category-archived')
    allActive.forEach(el => allCategoryActive.push(el.children[2].children[0].innerText))
    allCategoryActive.forEach(el => ("Random Thought"==el)?listRandomTh.push('Random Thought'):'')
    allCategoryActive.forEach(el => ("Idea"==el)?listIdea.push('Idea'):'')
    allCategoryActive.forEach(el => ("Task"==el)?listTask.push('Task'):'')
    randomThAmount.innerText = listRandomTh.length
    ideaAmount.innerText = listIdea.length
    taskAmount.innerText = listTask.length
    allArchived.forEach(el => allCategoryArchived.push(el.children[2].children[0].innerText))
    allCategoryArchived.forEach(el => ("Random Thought"==el)?listRandomThArch.push('Random Thought'):'')
    allCategoryArchived.forEach(el => ("Idea"==el)?listIdeaArch.push('Idea'):'')
    allCategoryArchived.forEach(el => ("Task"==el)?listTaskArch.push('Task'):'')
    randomThArchAmount.innerText = listRandomThArch.length
    ideaArchAmount.innerText = listIdeaArch.length
    taskArchAmount.innerText = listTaskArch.length
}
AnalystNote()
//----------------------------------------------------------------------------------------------------------------------


//method adding event listener. It also chooses what to do with the note - invoke the archiving or unarchiving method---
let arrNoteChoose = []
const getAllBtnArchive = () => {
    let nodeArchiveBtn =  document.querySelectorAll(".archive-btn")
    nodeArchiveBtn.forEach(el => el.name = 't')
    nodeArchiveBtn.forEach(el=>el.addEventListener('click',()=>{
        if (el.name == 't'){
            ArchiveNotes(el.id)
        }
        else {
            BackArchiveNotes(el.id)
        }

    }))
}
//----------------------------------------------------------------------------------------------------------------------


//archive note----------------------------------------------------------------------------------------------------------
const ArchiveNotes = (id) => {
    let indexClick = parseInt(id.match(/\d/))
    let listNoteArchive = document.getElementById(`task+${indexClick}`)
    listNoteArchive.attributes[0].value = 'task current-note archive'
    arrNoteChoose.push(listNoteArchive)
    arrNoteChoose.forEach(el => el.style.display = 'none')
    document.getElementById(`${id}`).name = 'f'
    AnalystNote()
}
//----------------------------------------------------------------------------------------------------------------------


//Backup note-----------------------------------------------------------------------------------------------------------
const BackArchiveNotes = (id) => {
    let indexClick = parseInt(id.match(/\d/))
    let listNoteArchive = document.getElementById(`task+${indexClick}`)
    listNoteArchive.attributes[0].value = 'task current-note active-note'
    let elBackUp = []
    arrNoteChoose.map((el,index)=>(el===listNoteArchive)?elBackUp = arrNoteChoose.splice(index,1):'')
    elBackUp.forEach(el => el.style.display = 'none')
    document.getElementById(`${id}`).name = 't'
    AnalystNote()
}
//----------------------------------------------------------------------------------------------------------------------
getAllBtnArchive()


//method show or hide archived note-------------------------------------------------------------------------------------
const openArchiveNotes = () => {
    let currentNote = document.querySelectorAll('.current-note')
    let openBtn = document.querySelector('.open-archive')
    let listNote = []
    for (let i = 0; i < currentNote.length; i++) {
        listNote[i] = currentNote[i]
    }
    let btnCreateNote = document.querySelector('.create-note')
    let switchOnOf = true
    openBtn.addEventListener('click',()=>{
        if (switchOnOf){
            openBtn.style.outline = '1px solid rgba(0,0,0,0.5)'
            openBtn.style.background = 'rgba(0,0,0, 0.3)'
            openBtn.style.borderRadius = '2px'
            btnCreateNote.style.pointerEvents = 'none'
            for (let i = 0; i < listNote.length; i++) {
                listNote[i].style.display = 'none'
            }
            for (let i = 0; i < arrNoteChoose.length; i++) {
                arrNoteChoose[i].style.display = ''
            }
            switchOnOf = false
        }
        else{
            openBtn.style.outline = 'none'
            openBtn.style.background = 'none'
            openBtn.style.borderRadius = 'none'
            btnCreateNote.style.pointerEvents = 'auto'
            for (let i = 0; i < listNote.length; i++) {
                listNote[i].style.display = ''
            }
            for (let i = 0; i < arrNoteChoose.length; i++) {
                arrNoteChoose[i].style.display = 'none'
            }
            switchOnOf = true
        }
    })
}
openArchiveNotes()
//----------------------------------------------------------------------------------------------------------------------