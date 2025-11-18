import React from 'react'
import { Input } from './ui/input'

const SearchBox = () => {
  return (
    <form>
      <Input
        placeholder="Search..."
        className="h-9 rounded-full bg-input text-foreground border border-border focus:ring-2 focus:ring-primary"
      />
    </form>
  );
}

export default SearchBox
