import {BEGIN_CHECK_MESSAGES, CREATE_MESSAGE, END_CHECK_MESSAGES} from "./types";
import {IMessage} from "../../components/messages/Messages";

interface State {
  items: IMessage[],
  isCheckingMessages: boolean,
}

const initialState: State = {
  items: [
    {
      id: 0,
      messageOwner: 'Пользователь 1',
      text: 'Привет',
      image: 'https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-22.png',
      date: '1:38:09 PM',
      isRead: true,
      isChecked: false,
      isSameOwner: false
    },
    {
      id: 1,
      messageOwner: 'Пользователь 2',
      text: 'Привет',
      image: 'https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-13.png',
      date: '2:38:09 PM',
      isRead: true,
      isChecked: false,
      isSameOwner: false
    },
    {
      id: 2,
      messageOwner: 'Пользователь 1',
      text: 'Когда дело доходит до романтических отношений, Активисты серьезно подходят к поиску партнера. Не для случайных встреч, люди с типом личности Активиста вместо этого ищут глубину и значение в своих отношениях.',
      image: 'https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-22.png',
      date: '6:38:09 PM',
      isRead: true,
      isChecked: false,
      isSameOwner: false
    },
    {
      id: 3,
      messageOwner: 'Пользователь 1',
      text: 'Активистам не торопятся, чтобы найти кого-то, с кем они действительно могут быть связаны. Как только они найдут кого-то, их отношения достигнут уровня глубины и искренности, о которых большинство людей могут только мечтать.',
      image: 'https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-22.png',
      date: '7:38:09 PM',
      isRead: true,
      isChecked: false,
      isSameOwner: true
    },
    {
      id: 4,
      messageOwner: 'Пользователь 1',
      text: 'Это по-настоящему?\n' +
        '\n' +
        'Активисты будут стараться изо всех сил искать людей, которые разделяют их стремление к аутентичности, и стараться избегать тех, кто этого не делает, особенно когда ищут партнера. Они теплые, дружелюбные, заботливые и проницательные, понимают мысли и эмоции других.',
      image: 'https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-22.png',
      date: '7:38:09 PM',
      isRead: true,
      isChecked: false,
      isSameOwner: true
    },
    {
      id: 5,
      messageOwner: 'Пользователь 2',
      text: 'Ваши результаты:\nЕсть все основания полагать, что Вам необходима помощь специалиста – клинического психолога или психиатра для прохождения более глубокой диагностики.',
      image: 'https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-13.png',
      date: '7:38:09 PM',
      isRead: false,
      isChecked: false,
      isSameOwner: false
    }
  ],
  isCheckingMessages: false
}

export const messagesReducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case CREATE_MESSAGE:
      return {
        ...state,
        items: state.items.concat(action.payload)
      };
    case BEGIN_CHECK_MESSAGES:
      return {
        ...state,
        isCheckingMessages: true
      }
    case END_CHECK_MESSAGES:
      return {
        ...state,
        isCheckingMessages: false
      }
    default:
      return state;
  }
}
