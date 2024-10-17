# Intelligent Cricket Team Selection System (ICTSS) - Frontend

The **Intelligent Cricket Team Selection System (ICTSS) - Frontend** is a web-based interface built with **Angular** and the **CoreUI template**. This frontend application communicates with the backend API to provide users with a seamless experience for managing cricket teams, viewing performance reports, and generating recommendations.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [API Integration](#api-integration)
- [Future Enhancements](#future-enhancements)

---

## Project Overview

This project provides the **user interface** for the Intelligent Cricket Team Selection System (ICTSS). Users can log in, manage players, create teams, and generate performance reports via this Angular-based application. The **CoreUI template** ensures a clean, modern design with built-in components for dashboards, forms, and data visualizations.

The frontend interacts with the **backend API** built with Spring Boot to display data and generate insights in real-time.

---

## Features

- **User Authentication**: Secure login and role-based access control.
- **Dashboard**: Overview of players, teams, and reports.
- **Player Management**: Add, update, delete, and view players.
- **Team Selection**: Create teams and view recommendations from the backend.
- **Performance Reports**: Generate and view player performance summaries.
- **Data Visualization**: Graphs and charts for reports and analytics.

---

## Technologies Used

- **Angular** - Frontend framework for building the UI.
- **CoreUI** - Angular admin template for the interface.
- **TypeScript** - Programming language for Angular components.
- **HTML5 & SCSS** - Markup and styling.
- **Bootstrap** - CSS framework for responsive design.
- **Angular HTTP Client** - For API communication with the backend.
- **Chart.js** - For data visualization.

---

## Requirements

Before you start, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Angular CLI** (v12 or higher) - Install via `npm install -g @angular/cli`

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-repository/ictss-frontend.git
cd ictss-frontend
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

---

## Running the Application

1. Start the Angular development server:

    ```bash
    ng serve
    ```

2. Open the frontend in your browser at:

    ```bash
    http://localhost:4200
    ```

---

## Folder Structure

```bash
/src
  /app
    /auth                 # Authentication module (login, logout)
    /dashboard            # Main dashboard view
    /players              # Player management module
    /teams                # Team management module
    /reports              # Reports and analytics
    /services             # Services for API integration
  /assets                 # Static assets (images, styles)
  /environments           # Configuration for different environments
  index.html              # Main HTML entry point
  styles.scss             # Global styles
angular.json              # Angular configuration
```

---

## API Integration

The frontend interacts with the **ICTSS backend** through the following APIs:

| API Endpoint                       | Method | Description                              |
|------------------------------------|--------|------------------------------------------|
| `/auth/login`                      | POST   | User login                               |
| `/players`                         | GET    | List all players                         |
| `/players`                         | POST   | Add a new player                         |
| `/players/{id}`                    | PUT    | Update an existing player                |
| `/players/{id}`                    | DELETE | Delete a player                          |
| `/teams`                           | POST   | Create a new team                        |
| `/teams/recommend`                 | GET    | Get recommended team based on data       |
| `/reports/performance`             | GET    | Generate performance report for players |

### Example Service for API Calls

Here’s an example of a **PlayerService** for making API calls to the backend:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:8080/api/players';

  constructor(private http: HttpClient) {}

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/all`);
  }

  addPlayer(player: Player): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, player);
  }

  updatePlayer(id: number, player: Player): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, player);
  }

  deletePlayer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
```

---

## Future Enhancements

- **Role-Based Dashboards**: Customize dashboards based on user roles (Admin, Coach, Analyst).
- **Live Data Integration**: Add live match data to provide real-time insights.
- **Enhanced Charts and Visualizations**: Use more complex visualizations for team and player performance.
- **Progressive Web App (PWA)**: Convert the frontend into a PWA for mobile compatibility.

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

This **README.md** provides a complete overview of the **frontend project** built with Angular and CoreUI, including **installation instructions**, **API integration details**, and **future enhancements**. Let me know if further customization is needed!
