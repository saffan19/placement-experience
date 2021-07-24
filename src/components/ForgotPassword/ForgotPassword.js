import './ForgotPassword.css';
function ForgotPassword()
{
    return(
        <div className='fp-cont'>
            <h5>Forgot Password?</h5>
 
            <div className="roww">
                <input type='email' placeholder='Enter Your Email'>
                </input>
            </div>
            <div className="roww">
                <button>Get Password On Your Mail</button>
            </div>
        </div>
    )
}
export default ForgotPassword