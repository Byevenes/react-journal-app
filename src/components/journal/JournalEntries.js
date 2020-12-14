import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
  const { notes } = useSelector((state) => state.notes);

  return (
    <div className="journal__entries">
      {notes.map((note) => {
        return <JournalEntry key={note.id} {...note} />;
      })}
    </div>
  );
};

JournalEntries.propTypes = {
  notes: PropTypes.array,
};
