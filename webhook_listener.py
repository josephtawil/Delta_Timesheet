from flask import Flask, request, abort
import subprocess
import os

app = Flask(__name__)

# Replace 'your-secret-token' with your actual GitHub webhook secret
SECRET_TOKEN = 'fufu1234'
# Replace 'your-heroku-app-name' with your actual Heroku app name
HEROKU_APP_NAME = 'delta-timesheet-app'

@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method == 'POST':
        payload = request.get_data(as_text=True)
        verify_signature(request.headers.get('X-Hub-Signature-256'), payload)
        data = request.json

        if data['ref'] == 'refs/heads/main':  # Change this branch name if necessary
            print('Received push event to main branch. Deploying...')
            deploy_heroku()
            return 'Deployment triggered successfully!', 200
        else:
            print(f'Ignoring push event to {data["ref"]} branch.')
            return 'Ignored.', 200
    else:
        abort(400)

def verify_signature(signature, payload):
    import hmac
    from hashlib import sha256

    secret = bytes(SECRET_TOKEN, 'utf-8')
    expected_signature = 'sha256=' + hmac.new(secret, payload.encode('utf-8'), sha256).hexdigest()

    if not hmac.compare_digest(signature, expected_signature):
        abort(400)

def deploy_heroku():
    print('Deploying to Heroku...')
    subprocess.run(['git', 'push', 'heroku', 'main'])

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port)
