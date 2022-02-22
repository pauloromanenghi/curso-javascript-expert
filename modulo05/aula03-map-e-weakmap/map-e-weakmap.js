const assert = require('assert')
const myMap = new Map();

// podem ter qualquer coisa como chave
myMap
    .set(1, 'one')
    .set('Paulo', { text: 'two'})
    .set(true, () => 'hello')


// usando um construtor
const myMapWithConstructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
])

//console.log('myMap', myMap)
assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Paulo'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em Objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'PauloRomanenghi' })

assert.deepStrictEqual(myMap.get({ id: 1}), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'PauloRomanenghi' })

// utilitários
// - No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4)

// para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if() = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({name: 'Paulo'}).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item.id imperfomátic para o Javascript
assert.ok(myMap.delete(onlyReferenceWorks))

// Não dá para iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
assert.deepEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Paulo",{"text":"two"}],[true, () => {}]]))

// for(const [key, item] of myMap) {
//     console.log({key, item})
// }

// Object é inseguro, pois dependemos do nome da chave, pode substituir algum comportamento padrão
// ({ }).toString() === '[object Object]'
// ({toString: () => 'Hey' }).toString() === 'Hey'

// qualquer chave pode colidir, com as propriedades herdadas do objeto, como
// constructor, toString, valueOf e etc.

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
}

// não tem restrição de nome de chave
myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Não da para limpar um Obj sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])


// --- WeakMap

// Pode ser coletado após perder as referencias:
// usado em casos bem específicos

// tem a maioria dos beneficios do Map
// MAS: não é interável
//    Só chaves de referencia e que você já conheça
// mais leve e preve leak de memoria, pq depois que as instancias saem da memoria, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)