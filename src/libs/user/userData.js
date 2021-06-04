class userData {
  static instance = new userData();

  id = ''
  username = '';
  first_name = '';
  last_name = '';
  profile_image = '';
  email = '';

  setValues(user) {
    if (user.id) {
      this.id = user.id
    }
    if (user.username) {
      this.username = user.username
    }
    if (user.first_name) {
      this.first_name = user.first_name
    }
    if (user.last_name) {
      this.last_name = user.last_name
    }
    if (user.profile_image) {
      this.profile_image = user.profile_image
    }
    if (user.email) {
      this.email = user.email
    }
  }

}

export default userData.instance