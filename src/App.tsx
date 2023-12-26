function App() {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem('text-area') as HTMLTextAreaElement
    const output = e.currentTarget.nextElementSibling as HTMLPreElement
    output.textContent = input.value
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="text-area">Input:</label>
        </div>
        <textarea name="text-area" id="text-area" />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <pre>Poo</pre>
    </div>

  )
}

export default App
