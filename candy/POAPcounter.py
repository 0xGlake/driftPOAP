import json

count = 0
result = ""

while count < 333:
  current = '''
      "{}": {{
      "name": "Inside NFTs and DAOs POAP",
      "image_hash": "713d0c06b9ee16dbc37b421071c33883519f8164e6fe3fd31edb87110866a8dd",
      "image_link": "https://arweave.net/FfdUSEX_6NZKhn18fBbLFl_fo4IxjrShO0xa5qMcoVw?ext=png",
      "metadata_hash": "affb42ed6da94b2f79bfc086a3ceb9367d638a07acbf7c53cfa76a8d6ec40fa4",
      "metadata_link": "https://arweave.net/gKR2GWTlFxAGCOtE0xooLi0t1n4XbvfBzEm7dSdBtZk",
      "onChain": false
    }},'''.format(count)

  result = result + current
  count = count + 1

with open("Output.txt", "w") as text_file:
    text_file.write(result)
