from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.get_json()
    if 'push' in data['ref']:
        # Pull the latest changes from the GitHub repository
        subprocess.run(['git', 'pull'])
        # Restart your web application server (assuming it's a Node.js application)
        subprocess.run(['pm2', 'restart', 'delta_timesheet'])
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
