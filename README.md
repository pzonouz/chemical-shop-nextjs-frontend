# Technologies Used:
- Nextjs
- Tailwind
- DaisyUi
- React-icons

# Error handling
- await fetch
  - try if res.ok==false => throw new Error(res.statusText)
  - catch(err): toast(err.message)