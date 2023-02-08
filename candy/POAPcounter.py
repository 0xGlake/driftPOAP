import json

count = 0
result = ""

while count < 333:
  current = '''
      "{}": {{
      "name": "Summer Camp Shark Tank POAP",
      "image_hash": "dd7db7b28dff70ec2d94c4bb5120124dfdc32c955cafca6a6d4599c493ea642f",
      "image_link": "https://arweave.net/FNieJLTDjKHjTxzIHukBuYpXv3vUuY23FSQZ0FAAfVQ?ext=png",
      "metadata_hash": "37dc608500fca0b869a69e19ff78acbf542d1049d623f8c46724df47f0cab247",
      "metadata_link": "https://arweave.net/3brze0si1CQb6ZKql5MRQ-juoB4OagcQbIHESKNOb1Y",
      "onChain": false
    }},'''.format(count)

  result = result + current
  count = count + 1

with open("Output.txt", "w") as text_file:
    text_file.write(result)
