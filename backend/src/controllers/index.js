import newPartner from './partners/newPartNer.js'
import deletePartner from './partners/deletePartner.js'
import updatePartner from './partners/updatePartner.js'
import joinFreeActivity from './freeActivities/joinFreeActivity.js'
import joinPartnerActivity from './partnersActivities/joinPartnerActivity.js'
import loginController from './admin/loginController.js'
import newCollaborator from './collaborators/newCollaborator.js'
import deleteCollaborator from './collaborators/deleteCollaborator.js'
import updateCollaborator from './collaborators/updateCollaborator.js'
import deleteEventController from './calendar/deleteEventController.js'
import updateEventController from './calendar/updateEventController.js'
import listEventsController from './calendar/listEventsController.js'
import saveMessage from './contact/saveMessage.js'
import createActivity from './freeActivities/createActivity.js'
import getEventController from './calendar/getEventController.js'
import generateCaptcha from './captcha/generateCaptcha.js'
import validateCaptcha from './captcha/validateCaptcha.js'
import googleSignIn from './googleSignIn/googleSignIn.js'

export {
    newPartner,
    updatePartner,
    deletePartner,
    createActivity,
    joinFreeActivity,
    joinPartnerActivity,
    loginController,
    newCollaborator,
    deleteCollaborator,
    updateCollaborator,
    deleteEventController,
    updateEventController,
    listEventsController,
    saveMessage,
    getEventController,
    generateCaptcha,
    validateCaptcha,
    googleSignIn,
}
