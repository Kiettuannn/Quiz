export function generateToken(){
  const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 20;
  let token = '';
  for(let i = 0; i < length; i++){
    token += char.charAt(Math.floor(Math.random() * char.length));
  }
  return token;
}