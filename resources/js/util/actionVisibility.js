const FORM_CONTEXTS = ['creating', 'updating']

function isFormContext(context) {
  return FORM_CONTEXTS.includes(context)
}

export function actionVisibleInContext(action, context) {
  if (!action) {
    return false
  }

  if (action.onlyOnIndex === true) {
    return context === 'index'
  }

  if (action.onlyOnDetail === true) {
    return context === 'detail'
  }

  if (action.onlyOnForms === true) {
    return isFormContext(context)
  }

  if (action.exceptOnForms === true && isFormContext(context)) {
    return false
  }

  if (context === 'index') {
    if (action.hideFromIndex === true) {
      return false
    }

    if (action.showOnIndex === false) {
      return false
    }
  }

  if (context === 'detail') {
    if (action.hideFromDetail === true) {
      return false
    }

    if (action.showOnDetail === false) {
      return false
    }
  }

  if (context === 'creating') {
    if (action.hideWhenCreating === true) {
      return false
    }

    if (action.showOnCreating === false) {
      return false
    }
  }

  if (context === 'updating') {
    if (action.hideWhenUpdating === true) {
      return false
    }

    if (action.showOnUpdating === false) {
      return false
    }
  }

  if (context === 'preview' && action.showOnPreview === false) {
    return false
  }

  if (context === 'peek' && action.showWhenPeeking === false) {
    return false
  }

  return true
}
