import type { BaseTranslation } from "../i18n-types.js";

const en: BaseTranslation = {
  general: {
    submit: "Submit",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    close: "Close",
    accept: "Accept",
    decline: "Decline",
    nothingFound: "Nothing found",
  },
  links: {
    homepage: "Homepage",
    toys: "Toys",
    adminPage: "Admin page",
    logout: "Logout",
    login: "Login",
    register: "Register",
  },
  filters: {
    filters: "Filters",
    search: "Search",
    searchByAny: "Search by any field",
    category: "Category",
    allCategories: "All categories",
  },
  categories: {
    figures: "Figures",
    cars: "Cars",
    radioControlled: "Radio controlled",
    construction: "Construction",
    educational: "Educational",
    electronic: "Electronic",
    executive: "Executive",
    foodRelated: "Food related",
    games: "Games",
    puzzle: "Puzzle",
    lego: "Lego",
    science: "Science",
    sound: "Sound",
    spinning: "Spinning",
    wooden: "Wooden",
    other: "Other",
  },
  form: {
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    name: "Name",
    phone: "Phone number",
    address: "Address",
    photo: "Photo",
    description: "Description",
    id: "Id",
    created: "Creation date",
    updated: "Update date",
    status: "Status",
    role: "Role",
    toysNumber: "Number of toys",
    placeholder: {
      email: "your@email.com",
      password: "strongPassword123",
      name: "Damian",
      phone: "999 999 999",
      address: "Lodz al. Politechniki 1",
      photo: "Image",
      toy: {
        name: "McQueen",
        description: "Good condition",
      },
    },
  },
  login: {
    login: "Login",
    welcomeBack: "Welcome back!",
    noAccount: "Don't have an account?",
    reset: "Reset password",
  },
  register: {
    register: "Register",
    welcome: "Welcome",
    alreadyHave: "Already have an account?",
    terms: "I accept terms and conditions",
    requirements: {
      number: "Includes number",
      lower: "Includes lowercase letter",
      upper: "Includes uppercase letter",
      special: "Includes special symbol",
      characters: "Includes at least 6 characters",
    },
  },
  profile: {
    details: {
      data: "Your data",
      changePassword: "Change your password",
      rating: "Your rating",
    },
    active: "Active offers",
    history: "Offers history",
    toys: {
      toys: "Your toys",
      new: "Add new toy",
    },
  },
  toy: {
    details: "Toy details",
    status:
      "{status|{ACTIVE: active, FINISHED: finished, UNCONFIRMED: unconfirmed}}",
    category:
      "{category|{FIGURES: FIGURES, ANIMALS: ANIMALS, CARS: CARS, RADIO_CONTROLLED: RADIO CONTROLLED, CONSTRUCTION: CONSTRUCTION, CREATIVE: CREATIVE, DOLLS: DOLLS, EDUCATIONAL: EDUCATIONAL, ELECTRONIC: ELECTRONIC, EXECUTIVE: EXECUTIVE, FOOD_RELATED: FOOD RELATED, GAMES: GAMES, PLAYGOUND: PLAYGOUND, PUZZLE: PUZZLE, LEGO: LEGO, SCIENCE: SCIENCE, SOUND: SOUND, SPINNING: SPINNING, WOODEN: WOODEN, OTHER: OTHER}}",
    swap: {
      selectOne: "Select one of your toys",
      notFound: "Nobody here",
      complete: "Swap complete",
      offer: "Swap offer",
      tryingSwap: "You are trying to swap for",
      make: "Make an offer",
    },
  },
  admin: {
    users: "Users",
    offers: "Offers",
    reported: "Reported toys",
    name: "name",
    email: "Email",
    phone: "Phone number",
    role: "Role",
    status: "Status",
    userDetails: "User details",
    roles: "{role|{BASIC: BASIC, ADMIN: ADMIN}}",
    statuses:
      "{status|{ACTIVE: ACTIVE, BLOCKED: BLOCKED, UNCONFIRMED: UNCONFIRMED}}",
  },
  offer: {
    statuses:
      "{status|{ACCEPTED: ACCEPTED, DECLINED: DECLINED, PENDING: PENDING}}",
    senderRate: "Sender rate",
    receiverRate: "Receiver rate",
    yourRate: "Your rate",
    rateUser: "Rate user",
    exchangeLike: "How did you like the exchange?",
    declineModal: {
      title: "Decline the offer",
      text: "Are you sure you want to decline this offer? This action is irreversible.",
      no: "No, don't decline",
      yes: "Decline offer",
    },
    confirmModal: {
      title: "Please confirm your action",
      text: "Are you sure you want to accept this offer? This action is irreversible.",
    },
    sender: "Sender",
    receiver: "Receiver",
    yourToy: "Your toy",
    swapComplete: {
      title: "Swap complete",
      textIntr:
        "You swapped for a toy in the app, now plase contact the person you made a swap with to finish the process",
      textInfo: "Here is the data about the person you are swapping with",
      textFinish:
        "Please keep in mind you won't be able to comeback to this screen so save the displayed data",
    },
  },
  notifications: {
    success: "Success",
    created: "{name: string} has been created",
    updated: "{name: string} has been updated",
    deleted: "{name: string} has been deleted",
    declined: "{name: string} has been declined",
    statusChanged: "Status has been changed",
    resetPasswordEmail:
      "If your email exists, we sent you a link to reset your password",
    resetPasswordConfirmation: "Your password has been reset",
    error: "Error",
    generalError: "Something went wrong",
  },
  homepage: {
    titleMain: "Play & Swap & Repeat",
    titleText:
      "Are you tired of your child's toys gathering dust and taking up space in your home? Look no further! Our platform allows you to swap toys with others, giving your child the opportunity to play with new toys while decluttering your home. Start browsing and swapping today!",
    gettingStarted: "Get started",
    features: {
      title1: "Large selection of toys",
      description1:
        "Our toy swapping platform has a wide selection of toys to choose from, so you are sure to find something that your child will love.",
      title2: "Easy to use interface",
      description2:
        "Our platform is designed to be user-friendly, so you can easily browse, request, and list toys with just a few clicks.",
      title3: "Like-minded community",
      description3:
        "You can connect with other parents who are looking to declutter their homes and give their children the opportunity to play with new toys",
    },
    faq: {
      title: "Frequently asked questions",
      question1: "How do I join the toy swapping community?",
      answer1:
        "To join the toy swapping community, simply create an account on our platform and start browsing available toys to swap. You can also list your own toys for others to request.",
      question2: "How do I request a toy from another user?",
      answer2:
        "To request a toy from another user, simply click on the toy that you are interested in and follow the prompts to send a request to the owner. The owner will then have the option to accept or decline your request.",
      question3: "How do I list my own toys for others to request?",
      answer3:
        "To list your own toys, click on the 'Add a toy' button and follow the prompts to upload a photo and description of the toy you want to list.",
      question4: "How do I complete a toy swap?",
      answer4:
        "Once a request for a toy has been accepted, the two users can coordinate the details of the swap, such as where to meet or how to exchange the toys.",
      question5: "Is there a fee to use the toy swapping platform?",
      answer5:
        "There is no fee to use our toy swapping platform. It is completely free to join and list toys.",
    },
  },
};

export default en;
