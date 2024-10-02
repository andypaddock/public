<section class="section--six container relative">
    <div class="row">
       <?php if( have_rows('image_text_blocks') ): ?>
    <div class="image--text">
    <?php while( have_rows('image_text_blocks') ): the_row(); 
        $image = get_sub_field('image');
        ?>
       <div class="image--text-block col-half">
        <div class="image--text-image">
            <?php echo wp_get_attachment_image( $image, 'full' ); ?>
            </div>
            <div class="image--text-scroll">
            <p class="underscores"><?php echo esc_html( get_sub_field('top_marker') ); ?></p>
            <h2 class="heading-4 heading-alt font--color-primary"><?php echo esc_html( get_sub_field('title') ); ?></h2>
            <?php the_sub_field('description'); ?>
            </div>
       </div>
    <?php endwhile; ?>
    </div>
<?php endif; ?>
   
    </div>
</section>