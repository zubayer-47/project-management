/* eslint-disable eqeqeq */
export function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line eqeqeq, no-mixed-operators
    var r = (Math.random() * 16) | 0,
      // eslint-disable-next-line eqeqeq
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}
export const assignUsers = async (allAssigns, joinString) => {
  return Array.isArray(allAssigns)
    ? allAssigns.length > 0 &&
        allAssigns
          .filter((currentItem, i, allItems) => {
            return i === allItems.indexOf(currentItem)
          })
          .join(joinString)
    : {
        opearation: 'invalid',
      }
}

export function fullTextSearching(collections, text) {
  return collections.filter((finders) => {
    if (finders?.items.length > 0) {
      return finders.items.filter((item, i) => {
        if (item?.title?.toLowerCase()?.includes(text?.toLowerCase())) {
          item.matched =
            text === '' ? false : item?.title?.toLowerCase()?.includes(text?.toLowerCase())
        } else {
          item.matched = false
        }
        return item
      })
    } else {
      return collections
    }
  })
}
