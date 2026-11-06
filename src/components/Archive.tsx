import { archive, archiveRepos } from "../data/content";

const TILTS = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.5, -1, 2, -1.5, 1];

/**
 * More builds as 35mm slide mounts, filed by kind. A project with a live
 * screenshot shows it; the rest get a title slide, the way a talk opens.
 */
const Archive = () => {
  let n = 0;
  return (
    <div className="slidebox">
      {archive.map((g) => (
        <section className="slide-group" key={g.group} aria-label={g.group}>
          <h3 className="hand slide-group-h">{g.group}</h3>
          <ul className="slides">
            {g.items.map((item) => {
              const i = n++;
              return (
                <li key={item.name} style={{ ["--tilt" as string]: `${TILTS[i % TILTS.length]}deg` }}>
                  <a className="slide" href={item.href} target="_blank" rel="noreferrer">
                    <span className={`slide-window${item.image ? "" : " is-title"}`}>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          width={1200}
                          height={750}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span className="slide-title" aria-hidden="true">
                          <span className="slide-title-name">{item.name}</span>
                          <span className="slide-title-stack">{item.stack}</span>
                        </span>
                      )}
                    </span>
                    <span className="slide-label hand">{item.name}</span>
                  </a>
                  <p className="slide-note">{item.note}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <p className="slidebox-more">
        <a className="link" href={archiveRepos} target="_blank" rel="noreferrer">
          See all 37 repositories on GitHub
        </a>
      </p>
    </div>
  );
};

export default Archive;
