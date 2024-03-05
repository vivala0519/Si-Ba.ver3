import json

which = 'pitchers'
yearScope = range(1982, 2024)

for year in yearScope:
    newDic = {}
    file_path = './{}/{}.json'.format(which, year)

    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
        # print(data)
        newDic = {'__collection__': {
            which: {
                year: data
            }
        }
        }

    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(newDic, file, indent=4, ensure_ascii=False)