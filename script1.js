// not a proper way.
const mainCard = document.getElementById('main-card')
const addCounterEl = document.getElementById('add_counter')
const resetEl = document.getElementById('reset_counter')
const defaultDomState = document.body.innerHTML;

const ADD_COUNTER = 'add_counter'
const INCREMENT = 'increment'
const DECREMENT = 'decrement'
const RESET = 'reset'

const initialState = [
  {
    id: 1,
    value: 0
  }
]

const increment = (id) => {
  return {
    type: INCREMENT,
    payload: {id: id, value: 5}
  }
}

const decrement = (id) => {
  return {
    type: DECREMENT,
    payload: {id: id, value: 3}
  }
}

const reset = () => {
  return {
    type: RESET
  }
}

const add_counter = () => {
  return {
    type: ADD_COUNTER
  }
}

const countReducer = (state = initialState, action) => {
  if (action.type == 'add_counter') {
    updatedState = [...state]
    updatedState.push({id: updatedState.at(-1).id + 1, value: 2})
    return updatedState
  }
  else if(action.type == 'increment') {
    updatedState = [...state]
    updatedState.map(st => {
      if (st.id == action.payload.id) {
        st.value = st.value + action.payload.value
      }
      return st
    })
    return updatedState
  } else if(action.type == 'decrement') {
    updatedState = [...state]
    updatedState.map(st => {
      if (st.id == action.payload.id) {
        st.value = st.value - action.payload.value
      }
      return st
    })
    return updatedState
  } else if (action.type == 'reset') {
    oldState = [{
      id: 1,
      value: 0
    }]
    document.body.innerHTML = defaultDomState
    return oldState
  }
  else {
    state
  }
}

const render = () => {
  const state = store.getState()

  if (state){
    if (state.length == 1) {
      document.getElementById(`counter-1`).innerHTML = state[0].value
    } else {
      state.map(st => {
        document.getElementById(`counter-${st.id}`).innerHTML = st.value
      })
    }

  } else {
    document.getElementById(`counter-1`).innerHTML = 0
  }
}

const store = Redux.createStore(countReducer)
render()
store.subscribe(render)

const counterIncrement = (id) => {
  store.dispatch(increment(id))
}

const counterDecrement = (id) => {
  store.dispatch(decrement(id))
}

const resetCounter = () => {
  store.dispatch(reset())
}

const modifyDom = (id) => {
  const htmlString = `<div class='p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow'>\
  <div id='counter-${id}' class='text-2xl font-semibold'></div>\
    <div class='flex space-x-3'>\
      <button\
        class='bg-indigo-400 text-white px-3 py-2 rounded shadow' id='increment-${id}' onclick=counterIncrement(${id})\
      >\
        Increment\
      </button>\
      <button\
        class='bg-red-400 text-white px-3 py-2 rounded shadow' id='decrement-${id}' onclick=counterDecrement(${id})\
      >\
        Decrement\
      </button>\
    </div>\
    </div>\
  </div>`;

  mainCard.innerHTML += htmlString
}

addCounterEl.addEventListener('click', ()=> {
  const state = store.getState()
  let id;
  if (state) {
    id = state.at(-1).id + 1
  } else {
    id = 2
  }
  modifyDom(id)
  store.dispatch(add_counter())
})

resetEl.addEventListener('click', ()=>{
  store.dispatch(resetCounter())
})