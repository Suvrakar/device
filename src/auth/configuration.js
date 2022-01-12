const configuration = {
  client_id: '6vnP0utSSzj7NAp1eNp8glR4HYePMeHz2JDsbbuL',
  redirect_uri: window.location.origin+'/authentication/callback',
  response_type: 'code',
  post_logout_redirect_uri: window.location.origin+'/login',
  scope: 'openid profile_all',
  authority: 'https://sso.hivecorelimited.com',
  silent_redirect_uri: window.location.origin+'/authentication/silent_callback',
  automaticSilentRenew: true,
  loadUserInfo: true,
  revokeAccessTokenOnSignout:true
};

export default configuration;
