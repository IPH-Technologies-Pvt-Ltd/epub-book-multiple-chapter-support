import React from "react";
function Chapter ({chapter,index, chapters, setChapters, margin}) {
    const handleChapterNameChange = (e) => {
        const newChapters = [...chapters];
        newChapters[index].title = e.target.value;
        setChapters(newChapters);
      };
    
      const handleContentChange = (e) => {
        const newChapters = [...chapters];
        newChapters[index].content = e.target.value;
        setChapters(newChapters);
      };
    return (
        <div>
        <div className="mb-3 " style={{marginTop:margin?"25px":""}}>
          <label htmlFor={`chapterName-${index}`} className="label-control fw-bolder">Enter Chapter Name</label>
          <input
            type="text"
            name={`chapterName-${index}`}
            className="form-control fw-semibold"
            placeholder="Chapter Name"
            value={chapter.title}
            onChange={handleChapterNameChange}
          />
        </div>
        <textarea
          className="form-control fw-semibold mt-4 "
          name={`content-${index}`}
          value={chapter.content}
          onChange={handleContentChange}
          placeholder="Enter your content here ..."
          rows={10}
          cols={80}
        />
      </div>
    )
};
export default Chapter;