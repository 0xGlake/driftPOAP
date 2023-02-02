import json

count = 0
result = ""

while count < 333:
  current = '''
      "{}": {{
      "name": "Drift Summer Camp POAP",
      "image_hash": "6e9e70498bd3663744dd92f66bcf384862c5892bc2fa856665bcfa9b503beb8b",
      "image_link": "https://arweave.net/p5jb7696kiHaE7k2yZ0vRO6XhlpUioqWPTHzRlmJmRQ?ext=png",
      "metadata_hash": "8f6592b14c7a0be3bcc0c6a03dc6567d8ba5a69fdc3ccbced45ed6a2ab3eb389",
      "metadata_link": "https://arweave.net/KvsO0AVo2Tjy-dRmVYfZ-43Or2XTkY2mIqN4fFtCIdY",
      "onChain": false
    }},'''.format(count)

  result = result + current
  count = count + 1

with open("Output.txt", "w") as text_file:
    text_file.write(result)
