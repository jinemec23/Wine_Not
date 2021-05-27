import os
from os import name
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import csv

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy

from secrets import pw
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:"+ pw +"@localhost:5432/wine_db"
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///wine_db.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

wine_db = SQLAlchemy(app)

class Wines(wine_db.Model):
    __tablename__ = 'wines_clean'
    # id = wine_db.Column(wine_db.Integer, primary_key=True)
    Vintage = wine_db.Column(wine_db.String)
    Country = wine_db.Column(wine_db.String)
    County = wine_db.Column(wine_db.String)
    Designation = wine_db.Column(wine_db.String)
    Points = wine_db.Column(wine_db.Integer)
    Price = wine_db.Column(' Price ', wine_db.String)
    Province = wine_db.Column(wine_db.String)
    Title = wine_db.Column(wine_db.String, primary_key=True)
    Variety = wine_db.Column(wine_db.String)
    Winery = wine_db.Column(wine_db.String)
    Year = wine_db.Column(wine_db.Integer)

    def __repr__(self):
        return '<Wines %r>' % (self.name)


#create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/wine_data2")
def wine_data2():
    results = wine_db.session.query(
        Wines.Vintage,
        Wines.Country,
        Wines.County,
        Wines.Designation,
        Wines.Points,
        Wines.Price,
        Wines.Province,
        Wines.Title,
        Wines.Variety,
        Wines.Winery,
        Wines.Year
    ).limit(10).all()

   
    vintage = [result[0] for result in results]
    country = [result[1] for result in results]
    county = [result[2] for result in results]
    designation = [result[3] for result in results]
    points = [result[4] for result in results]
    price = [result[5] for result in results]
    province = [result[6] for result in results]
    title = [result[7] for result in results]
    variety = [result[8] for result in results]
    winery = [result[9] for result in results]
    year = [result[10] for result in results]

    wine_varieties = [{
        "title": title, 
       "vintage": vintage,
       "country": country,
       "county": county,
       "designation": designation,
       "points": points,
       "price": price,
       "province": province,
       "variety": variety, 
       "winery": winery,
       "year": year     
    }]
    

    return jsonify(wine_varieties)

@app.route("/api/wine_data")
def wine_data():
    results = wine_db.session.query(
        Wines.Vintage,
        Wines.Country,
        Wines.County,
        Wines.Designation,
        Wines.Points,
        Wines.Price,
        Wines.Province,
        Wines.Title,
        Wines.Variety,
        Wines.Winery,
        Wines.Year
    ).limit(10).all()
    return jsonify(results)

@app.route("/table")
def table():
     return render_template("tablesearch.html")

@app.route("/table2")
def table2():
     return render_template("index2donotuse.html")

@app.route("/redvarietals")
def redvarietals():
    return render_template("redvarietals.html")

@app.route("/rosevarietals")
def rosevarietals():
    return render_template("rosevarietals.html")

@app.route("/whitevarietals")
def whitevarietals():
    return render_template("whitevarietals.html")

@app.route("/sparklingvarietals")
def sparklingvarietals():
    return render_template("sparklingvarietals.html")

@app.route("/topwinesbycountry")
def top_country_wines():
    return render_template("winesbycountry.html")

@app.route("/italy")
def italy():
    return render_template("test.html")

if __name__ == "__main__":
    app.run(debug=True)
