import React, { useState } from "react";
import "./CommunityEvent.css";

const CommunityEvent = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Village Cleanliness Drive",
      date: "2026-07-10",
      location: "Mukteshwar",
      description:
        "Let's come together to keep our beautiful hills clean and green.",
      attendees: [],
      contributors: [],
    },
    {
      id: 2,
      title: "Local Folk Music Festival",
      date: "2026-07-15",
      location: "Almora",
      description:
        "Celebrate our culture through folk songs, dance, and storytelling.",
      attendees: [],
      contributors: [],
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleCreateEvent = (e) => {
    e.preventDefault();

    const event = {
      id: Date.now(),
      ...newEvent,
      attendees: [],
      contributors: [],
    };

    setEvents([...events, event]);

    setNewEvent({
      title: "",
      date: "",
      location: "",
      description: "",
    });
  };

  const attendEvent = (id) => {
    const message = prompt(
      "Share a message with the organizer before attending:"
    );

    if (!message) return;

    setEvents(
      events.map((event) =>
        event.id === id
          ? {
              ...event,
              attendees: [...event.attendees, message],
            }
          : event
      )
    );
  };

  const contributeEvent = (id) => {
    const message = prompt(
      "How would you like to contribute? (Volunteer, Sponsor, Resources, etc.)"
    );

    if (!message) return;

    setEvents(
      events.map((event) =>
        event.id === id
          ? {
              ...event,
              contributors: [...event.contributors, message],
            }
          : event
      )
    );
  };

  return (
    <div className="community-page">
      <div className="community-header">
        <h1>🌄 Community Events</h1>
        <p>
          Strengthening hill communities through shared celebrations,
          volunteering, cultural programs, and local initiatives.
        </p>
      </div>

      <div className="event-form-container">
        <h2>Create a Community Event</h2>

        <form onSubmit={handleCreateEvent}>
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            required
          />

          <input
            type="date"
            value={newEvent.date}
            onChange={(e) =>
              setNewEvent({ ...newEvent, date: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={newEvent.location}
            onChange={(e) =>
              setNewEvent({ ...newEvent, location: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Describe your event..."
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            rows="4"
            required
          />

          <button type="submit" className="create-btn">
            Create Event
          </button>
        </form>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <h3>{event.title}</h3>

            <p className="event-location">
              📍 {event.location}
            </p>

            <p className="event-date">
              📅 {event.date}
            </p>

            <p className="event-description">
              {event.description}
            </p>

            <div className="event-stats">
              <span>
                🙋 {event.attendees.length} Attending
              </span>

              <span>
                🤝 {event.contributors.length} Contributors
              </span>
            </div>

            <div className="event-actions">
              <button
                className="attend-btn"
                onClick={() => attendEvent(event.id)}
              >
                Attend Event
              </button>

              <button
                className="contribute-btn"
                onClick={() => contributeEvent(event.id)}
              >
                Contribute
              </button>
            </div>

            <div className="community-message">
              Together, we preserve traditions, support neighbors,
              and build stronger mountain communities.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityEvent;