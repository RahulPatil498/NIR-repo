from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.json
        values_str = data['values']
        values = [float(v.strip()) for v in values_str.split(',') if v.strip()]

        if len(values) != 100:
            return jsonify({'error': 'Please provide exactly 100 comma-separated values.'})

        original_30th = values[29]  # 30th value (index 29)
        normalization_offset = original_30th - 15
        normalized_value = normalization_offset  # This becomes the new base for subtraction

        # Use abs() to remove any negative sign from result
        result = [round(abs(normalized_value - b), 4) for b in values[30:]]

        return jsonify({'result': ", ".join(str(r) for r in result)})
    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'})

if __name__ == '__main__':
    app.run(debug=True)
