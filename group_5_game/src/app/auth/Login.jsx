export default function Login() {





    return (

        <div>
            <h1>Login</h1>
            <form>
                <input
                    style={inputStyle}
                    type="email"
                    placeholder="Email"
                />
                <input
                    style={inputStyle}
                    type="password"
                    placeholder="Password"
                />
                <button
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginTop: '10px',
                    }}
                >
                    Login
                </button>
            </form>
            <button
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#FF4D4D',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '10px',
                }}
            >
                Create Account
            </button>
        </div>
        
    );
}