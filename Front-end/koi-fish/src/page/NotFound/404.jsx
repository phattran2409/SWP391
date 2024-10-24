import React, { useEffect, useState } from "react";
import "./404.css"
export default function PageNotFoud()  { 
    return (
      <section class="page_404 flex justify-center">
        <div class="container ">
          <div class="flex ">
            <div class="flex-1">
              <div class="flex-col col-sm-10 col-sm-offset-1  text-center">
                <div class="flex-col w-full justify-center four_zero_four_bg">
                  <h1 class="text-center ">404</h1>
                </div>

                <div class="contant_box_404">
                  <h3 class="h2">Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>

                  <a href="/home" class="link_404">
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}