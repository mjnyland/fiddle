import React from "react";

type Note = {
  content: string;
  type?: "normal" | "automation";
};

type NotesPanelProps = {
  notes: Note[];
};

const NotesPanel: React.FC<NotesPanelProps> = ({ notes }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <span className="font-medium">Notes</span>
          <span className="ml-2 text-gray-500 text-sm">1</span>
        </div>
        <button className="text-blue-500 hover:text-blue-600">
          <span>+</span>
        </button>
      </div>

      <div className="p-4 space-y-4">
        {notes.map((note, index) => (
          <div key={index} className="text-sm">
            <div
              className={`p-2 rounded ${
                note.type === "automation" ? "bg-green-50 text-green-800" : ""
              }`}
            >
              {note.type === "automation" && (
                <div className="text-xs font-medium mb-1">Automation</div>
              )}
              <div>{note.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPanel;
