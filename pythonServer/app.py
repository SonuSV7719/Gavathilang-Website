from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import re
import platform

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/execute', methods=['POST'])
def execute_code():
    try:            
        code_file = request.files['code_file']
        code = code_file.read().decode('utf-8')
        if 'bhawa input de naa' in code:
            return jsonify({'result': "Input feature lawkarach yeil !!!....", 'isError': True})
        if 'hello gavathilang' not in code[:30]:
            return  jsonify({'result': "Are bhawa chukala naa!! Gavathilang chi suruwat 'hello gavathilang' ne zali pahije", 'isError': True})
        if 'bye gavathilang' not in code[-20: ]:
            return jsonify({'result': "Are bhawa chukala naa!! Gavathilang cha end 'bye gavathilang' ne zali pahije", 'isError': True})
        code = parseData(code)
        result = execute_python_code(code)
        if result['isErr'] :
            return jsonify({'result': result['result'], 'isError': True })
        else:
            return jsonify({'result': result['result'], 'isError': False})
        
    except Exception as e:
        return jsonify({'result': None, 'error': str(e)})

def execute_python_code(code):
    if platform.system() == 'Linux':
        pythonType = 'python3'
    else:
        pythonType = 'python'
    result = subprocess.run([pythonType, '-c', code], capture_output=True, text=True)
    if result.stderr:
        # print("Eroor: ", result.stderr)
        return {'result' : result.stderr, 'isErr' : True}
    else:
        # print("Result: ", result.stdout)
        return {'result' : result.stdout, 'isErr' : False}



def parseData(code):
    keyword = {
        r'nahi tar jewha bhawa' : 'elif',
        r'(bol naa bhawa)\s+' : 'print',
        r'(hello gavathilang)\s+' : '',
        r'(bye gavathilang)\s+' : '',
        r'(bhawa he ahe)\s+' : '',
        r'jewha bhawa' : 'if',
        r'(asel)\s+' : '',
        r'asel' : '',
        r'jewha paryant bhawa' : 'while',
        r'(ahe)\s+' : '',
        r'ahe' : '',
        r'(bhawa input de naa)\s+' : 'input',
        r'(thamb bhawa)\s+' : 'break',
        r'(chalu thew bhawa)\s+' : 'continue',
        r'bye gavathilang' : '',
        r'bol naa bhawa' : 'print',
        r'nahi tar bhawa' : 'else',
        r'nahi tar' : 'else'
    }
    for pattern, replaceword in keyword.items():
        mypattern = re.compile(pattern=pattern)
        code = mypattern.sub(replaceword, code)
    pattern = re.compile(r'(bye gavathilang)\s+')
    code = pattern.sub(r'', code)
    
    return code


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
