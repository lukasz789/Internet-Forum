import {
  SHOW_FILL_FULL_FORM_NOTIFICATION,
  SHOW_TOO_SHORT_INPUTS_IN_FORM,
  REGISTER_USER_DONE,
  REGISTER_USER_ERROR,
  REGISTER_USER_START,
  LOGIN_USER_DONE,
  LOGIN_USER_ERROR,
  LOGIN_USER_START,
  LOGOUT_USER,
  GET_QUESTIONS_START,
  GET_QUESTIONS_DONE,
  HANDLE_CHANGE,
  CLEAR_ALERT,
  ADD_QUESTION_START,
  ADD_QUESTION_DONE,
  CLEAR_QUESTION_FORM,
  CHANGE_PAGE,
  TRIGGER_POPUP,
  CLEAR_POPUP,
} from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_FILL_FULL_FORM_NOTIFICATION:
      return {
        ...state,
        notificationText: 'Please fill out the form',
        showNotification: true,
      }
    case SHOW_TOO_SHORT_INPUTS_IN_FORM:
      return {
        ...state,
        notificationText: 'All inputs must have at least 6 characters',
        showNotification: true,
      }
    case REGISTER_USER_START:
      return {
        ...state,
        isLoading: true,
      }
    case REGISTER_USER_DONE:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        username: action.payload.username,
      }
    case REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showNotification: true,
        notificationText: action.payload.msg,
      }
    case LOGIN_USER_START:
      return {
        ...state,
        isLoading: true,
      }
    case LOGIN_USER_DONE:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        username: action.payload.username,
      }
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showNotification: true,
        notificationText: action.payload.msg,
      }
    case LOGOUT_USER:
      return {
        ...state,
        username: null,
        token: '',
      }
    case GET_QUESTIONS_START:
      return { ...state, isLoading: true, showNotification: false }
    case GET_QUESTIONS_DONE:
      return {
        ...state,
        isLoading: false,
        questions: action.payload.allPosts,
        totalQuestions: action.payload.totalPosts,
        numOfPages: action.payload.numOfPages,
      }
    case HANDLE_CHANGE:
      return { ...state, page: 1, [action.payload.name]: action.payload.value }
    case CLEAR_ALERT:
      return {
        ...state,
        showNotification: false,
        alertType: '',
        alertText: '',
      }
    case CLEAR_QUESTION_FORM:
      return {
        ...state,
        questionTitle: '',
        questionContent: '',
      }
    case ADD_QUESTION_START:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_QUESTION_DONE:
      return {
        ...state,
        isLoading: false,
      }
    case CHANGE_PAGE:
      return { ...state, page: action.payload.page }
    case TRIGGER_POPUP:
      return {
        ...state,
        alertPopupType: action.payload.alertPopupType,
        alertPopupMessage: action.payload.alertPopupMessage,
        alertPopupShow: true,
      }
    case CLEAR_POPUP:
      return {
        ...state,
        alertPopupType: '',
        alertPopupMessage: '',
        alertPopupShow: false,
      }

    default:
      throw new Error(`no action: ${action.type}`)
  }
}

export default reducer
