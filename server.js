require("dotenv").config();
const { SMTPServer } = require("smtp-server");

const PORT = process.env.SMTP_PORT || 2525;
const USER = process.env.SMTP_USER;
const PASSWORD = process.env.SMTP_PASSWORD;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: false,

    onAuth(auth, session, callback) {
        const { username, password } = auth;
        
        // Basic username/password check
        if (username === USER && password === PASSWORD) {
            console.log(`[INFO] Auth successful for user ${username}`);
            return callback(null, { user: username });
        }

        console.log(`[WARN] Auth failed for user ${username}`);
        return callback(new Error("Authentication failed"));
    },

    onConnect(session, callback) {
        console.log(`[INFO] Connection established. Session ID: ${session.id}`);
        callback();
    },

    onMailFrom(address, session, callback) {
        console.log(`[INFO] MAIL FROM: ${address.address}, Session ID: ${session.id}`);
        callback();
    },

    onRcptTo(address, session, callback) {
        console.log(`[INFO] RCPT TO: ${address.address}, Session ID: ${session.id}`);
        callback();
    },

    onData(stream, session, callback) {
        console.log(`[INFO] Data received for session ${session.id}`);
        let emailData = '';
        stream.on('data', (chunk) => emailData += chunk.toString());
        stream.on('end', () => {
            console.log(`[INFO] Email content:\n${emailData}`);
            callback();
        });
    }
});

server.listen(PORT, () => console.log(`[INFO] SMTP Server running on PORT ${PORT}`));
